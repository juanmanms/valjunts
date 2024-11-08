import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Check, X } from 'lucide-react';

import { Login } from './Login';

interface Business {
  id: number;
  name: string;
  description: string;
  service: string;
  phone: string;
  email: string;
  website?: string;
  image?: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const AdminPanel = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetchPendingBusinesses();
  }, []);

  const fetchPendingBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBusinesses(data || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    id: number,
    status: 'approved' | 'rejected'
  ) => {
    try {
      const { error } = await supabase
        .from('businesses')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setBusinesses(
        businesses.map((business) =>
          business.id === id ? { ...business, status } : business
        )
      );
    } catch (error) {
      console.error('Error updating business status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (!session) {
    return <Login />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Panel de Administración
      </h2>

      <div className="space-y-6">
        {businesses.map((business) => (
          <div key={business.id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {business.name}
                </h3>
                <p className="mt-2 text-gray-600">{business.description}</p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Contacto:</h4>
                    <p className="text-gray-600">{business.phone}</p>
                    <p className="text-gray-600">{business.email}</p>
                    {business.website && (
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Sitio web
                      </a>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Servicios:</h4>
                    <p className="text-gray-600">{business.service}</p>
                  </div>
                </div>
              </div>

              {business.status === 'pending' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(business.id, 'approved')}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                  >
                    <Check className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(business.id, 'rejected')}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              )}

              {business.status !== 'pending' && (
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${business.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}
                >
                  {business.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                </span>
              )}
            </div>
          </div>
        ))}

        {businesses.length === 0 && (
          <p className="text-center text-gray-600">
            No hay solicitudes pendientes
          </p>
        )}
      </div>
    </div>
  );
};
