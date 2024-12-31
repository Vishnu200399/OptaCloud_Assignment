import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Map } from './Map';
import { Location } from '../types/address';
import * as Toast from '@radix-ui/react-toast';
import { MapsService } from '../services/maps';

interface LocationInputProps {
  location: Location;
  onLocationChange: (location: Location) => void;
  onAddressGenerated: (address: { unit: string; area: string }) => void;
}

export function LocationInput({ location, onLocationChange, onAddressGenerated }: LocationInputProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setToastMessage('Geolocation is not supported by your browser');
      setShowToast(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        onLocationChange(newLocation);
        
        try {
          // Get address from coordinates
          const address = await MapsService.reverseGeocode(newLocation);
          if (address) {
            // Extract relevant parts from the formatted address
            const addressParts = address.split(',');
            onAddressGenerated({
              unit: addressParts[0]?.trim() || '',
              area: addressParts.slice(1, 3).join(',').trim() || ''
            });
          }
        } catch (error) {
          console.error('Error getting address:', error);
          setToastMessage('Unable to get address details. Please enter them manually.');
          setShowToast(true);
        }
      },
      (error) => {
        let message = 'An unknown error occurred.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Please allow location access to use this feature.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out.';
            break;
        }
        setToastMessage(message);
        setShowToast(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="space-y-6">
      <Map center={location} onLocationChange={onLocationChange} />
      <button
        onClick={getCurrentLocation}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
      >
        <MapPin size={20} />
        Use Current Location
      </button>

      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="bg-white rounded-lg shadow-lg p-4 border border-gray-200"
          open={showToast}
          onOpenChange={setShowToast}
        >
          <Toast.Title className="font-medium">Location Service</Toast.Title>
          <Toast.Description className="mt-1 text-gray-600">
            {toastMessage}
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-[390px] max-w-[100vw] m-0 list-none z-50" />
      </Toast.Provider>
    </div>
  );
}