import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { supabase } from '../lib/supabase';
import { municipios, Municipio } from '../constants/municipios';

interface FormData {
  name: string;
  description: string;
  service: string;
  phone: string;
  email: string;
  website: string;
  image: string;
  address: string;
  municipio: Municipio;
}

export const BusinessForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('businesses')
        .insert([{ ...data, status: 'pending' }]);

      if (error) throw error;

      setMessage('¡Gracias! Tu solicitud ha sido enviada y está pendiente de revisión.');
      reset();
    } catch (error) {
      setMessage('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre del Negocio *
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Este campo es obligatorio' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción *
          </label>
          <textarea
            id="description"
            {...register('description', { required: 'Este campo es obligatorio' })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.description && <p className="text-red-600">{errors.description.message}</p>}
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">
            Servicios Ofrecidos *
          </label>
          <textarea
            id="service"
            {...register('service', { required: 'Este campo es obligatorio' })}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.service && <p className="text-red-600">{errors.service.message}</p>}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Teléfono *
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone', { required: 'Este campo es obligatorio' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico *
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Este campo es obligatorio' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">
            Sitio Web
          </label>
          <input
            type="url"
            id="website"
            {...register('website')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            URL de Imagen
          </label>
          <input
            type="url"
            id="image"
            {...register('image')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            {...register('address')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.address && <p className="text-red-600">{errors.address.message}</p>}
        </div>

        <div>
          <label htmlFor="municipio" className="block text-sm font-medium text-gray-700">
            Municipio *
          </label>
          <select
            id="municipio"
            {...register('municipio', { required: 'Este campo es obligatorio' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {municipios.map((municipio) => (
              <option key={municipio} value={municipio}>
                {municipio.length > 30 ? `${municipio.substring(0, 30)}...` : municipio}
              </option>
            ))}
          </select>
          {errors.municipio && <p className="text-red-600">{errors.municipio.message}</p>}
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