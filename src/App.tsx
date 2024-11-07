import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Building2, UserCog, PlusCircle } from 'lucide-react';
import { BusinessForm } from './components/BusinessForm';
import { AdminPanel } from './components/AdminPanel';
import { BusinessCard } from './components/BusinessCard';
import { LandingHero } from './components/LandingHero';
import { supabase } from './lib/supabase';

function App() {
  const [businesses, setBusinesses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('status', 'approved')
        .order('name');

      if (error) throw error;
      setBusinesses(data || []);
    } catch (error) {
      console.error('Error fetching businesse:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link
                  to="/"
                  className="flex items-center px-2 py-2 text-gray-900 hover:text-blue-600"
                >
                  <Building2 className="w-6 h-6 mr-2" />
                  <span className="font-semibold">Unidos por Valencia</span>
                </Link>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/registro"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600"
                >
                  <PlusCircle className="w-5 h-5 mr-1" />
                  Registrar Negocio
                </Link>
                <Link
                  to="/directorio"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600"
                >
                  <Building2 className="w-5 h-5 mr-1" />
                  Directorio
                </Link>
                <Link
                  to="/admin"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600"
                >
                  <UserCog className="w-5 h-5 mr-1" />
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<LandingHero />} />
            <Route
              path="/directorio"
              element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Directorio de Negocios
                  </h1>
                  {loading ? (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {businesses.map((business) => (
                        <BusinessCard key={business.id} business={business} />
                      ))}
                      {businesses.length === 0 && (
                        <p className="col-span-full text-center text-gray-600">
                          No hay negocios registrados aún.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              }
            />
            <Route path="/registro" element={<BusinessForm />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;