import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const BusinessForm = () => {
  async function getBusinesses() {
    const { data, error } = await supabase.from('businesses').select('*');
    if (error) {
      console.error('Error fetching businesses:', error);
    } else {
      console.log('Businesses:', data);
    }
  }
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    service: '',
    phone: '',
    email: '',
    website: '',
    image: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('businesses')
        .insert([{ ...formData, status: 'pending' }]);

      if (error) throw error;

      setMessage(
        '¡Gracias! Tu solicitud ha sido enviada y está pendiente de revisión.'
      );
      setFormData({
        name: '',
        description: '',
        service: '',
        phone: '',
        email: '',
        website: '',
        image: '',
        address: '',
      });
    } catch (error) {
      setMessage('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getBusinesses;
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Registra tu Negocio
      </h2>

      {message && (
        <div className="mb-6 p-4 rounded-md bg-blue-50 text-blue-700">
          {message}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre del Negocio *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción *
          </label>
          <textarea
            name="description"
            id="description"
            required
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="service"
            className="block text-sm font-medium text-gray-700"
          >
            Servicios Ofrecidos *
          </label>
          <textarea
            name="service"
            id="service"
            required
            rows={2}
            value={formData.service}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Teléfono *
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-700"
          >
            Sitio Web
          </label>
          <input
            type="url"
            name="website"
            id="website"
            value={formData.website}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            URL de Imagen
          </label>
          <input
            type="url"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Dirección *
          </label>
          <input
            type="text"
            name="address"
            id="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
      </div>
    </form>
  );
};
