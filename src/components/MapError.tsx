import React from 'react';
import { Map } from 'lucide-react';
import { isGoogleMapsError, getGoogleMapsErrorType } from '../utils/errors';

interface MapErrorProps {
  error: Error;
}

const errorMessages = {
  billing_not_enabled: {
    title: 'Maps Service Not Available',
    message: 'The Google Maps service requires billing to be enabled. Please contact the administrator to resolve this issue.',
  },
  invalid_key: {
    title: 'Invalid API Key',
    message: 'There is an issue with the Google Maps API key. Please contact the administrator to resolve this issue.',
  },
  unknown: {
    title: 'Unable to Load Map',
    message: 'There was a problem loading the map. Please try again later.',
  },
};

export function MapError({ error }: MapErrorProps) {
  const errorType = isGoogleMapsError(error) 
    ? getGoogleMapsErrorType(error) 
    : 'unknown';
  
  const { title, message } = errorMessages[errorType];

  return (
    <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
      <Map className="mb-4 text-gray-400" size={48} />
      <h3 className="mb-2 text-lg font-semibold text-gray-700">{title}</h3>
      <p className="max-w-md text-sm text-gray-600">{message}</p>
    </div>
  );
}