import React from 'react';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface BusinessCardProps {
  business: {
    name: string;
    description: string;
    service: string;
    phone: string;
    email: string;
    website?: string;
    image?: string;
    address: string;
  };
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const formatWebsite = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `http://${url}`;
    }
    return url;
  };
  const defaultImage = 'https://www.shutterstock.com/image-vector/image-icon-600nw-211642900.jpg';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">

      <img
        src={business.image || defaultImage}
        alt={business.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{business.name}</h3>
        <p className="text-gray-600 mb-4">{business.description}</p>
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-gray-900 mb-2">Servicios:</h4>
          <p className="text-gray-600 mb-4">{business.service}</p>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <a href={`tel:${business.phone}`} className="hover:text-blue-600">
                {business.phone}
              </a>
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <a href={`mailto:${business.email}`} className="hover:text-blue-600">
                {business.email}
              </a>
            </div>
            {business.website && (
              <div className="flex items-center text-gray-600">
                <Globe className="w-4 h-4 mr-2" />
                <a
                  href={formatWebsite(business.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  Sitio web
                </a>
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{business.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};