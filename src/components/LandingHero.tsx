import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Store, Users, CheckCircle } from 'lucide-react';

export const LandingHero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&q=80&w=2574"
          alt="Valencia"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/90 to-blue-800/90" />
      </div>

      <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Unidos por Valencia
          </h1>
          <p className="mt-6 text-xl text-blue-100">
            Directorio gratuito para apoyar a los negocios y autónomos afectados por la DANA
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/registro"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors"
            >
              <Store className="w-5 h-5 mr-2" />
              Registra tu Negocio
            </Link>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
            >
              <Heart className="w-5 h-5 mr-2" />
              Apoya un Negocio Local
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <Heart className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Apoyo Comunitario</h3>
              <p className="mt-2 text-gray-600">
                Conectamos la comunidad con los negocios afectados para fortalecer la recuperación.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Store className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Visibilidad Gratuita</h3>
              <p className="mt-2 text-gray-600">
                Promoción sin coste para ayudar a la reactivación económica de los negocios.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Red de Solidaridad</h3>
              <p className="mt-2 text-gray-600">
                Creamos una red de apoyo entre vecinos, clientes y empresas locales.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">¿Cómo Funciona?</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full p-2">
                  <Store className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900">1. Regístrate</h3>
              </div>
              <p className="text-gray-600">
                Completa el formulario con los datos de tu negocio afectado por la DANA.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full p-2">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900">2. Verificación</h3>
              </div>
              <p className="text-gray-600">
                Verificamos tu información para garantizar la autenticidad del directorio.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full p-2">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900">3. Conecta</h3>
              </div>
              <p className="text-gray-600">
                Tu negocio aparecerá en el directorio, visible para toda la comunidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};