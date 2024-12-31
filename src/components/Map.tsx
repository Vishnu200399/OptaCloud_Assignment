import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin } from 'lucide-react';
import { isGoogleMapsError } from '../utils/errors';

interface MapProps {
  center: { lat: number; lng: number };
  onLocationChange: (location: { lat: number; lng: number }) => void;
}

export function Map({ center, onLocationChange }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<Error | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          version: 'weekly',
        });

        const google = await loader.load();
        
        if (!mapRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom: 15,
          disableDefaultUI: true,
          zoomControl: true,
        });

        mapInstanceRef.current = map;

        const marker = new google.maps.Marker({
          position: center,
          map,
          draggable: true,
        });

        markerRef.current = marker;

        google.maps.event.addListener(marker, 'dragend', () => {
          const position = marker.getPosition();
          if (position) {
            onLocationChange({ lat: position.lat(), lng: position.lng() });
          }
        });

        map.addListener('click', (e: google.maps.MapMouseEvent) => {
          const position = e.latLng;
          if (position && marker) {
            marker.setPosition(position);
            onLocationChange({ lat: position.lat(), lng: position.lng() });
          }
        });
      } catch (err) {
        console.error('Map initialization error:', err);
        setError(err as Error);
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    if (markerRef.current && mapInstanceRef.current) {
      markerRef.current.setPosition(center);
      mapInstanceRef.current.panTo(center);
    }
  }, [center]);

  if (error) {
    return (
      <div className="relative">
        <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
          <MapPin className="mb-4 text-gray-400" size={48} />
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            {isGoogleMapsError(error) ? 'Map Service Unavailable' : 'Unable to Load Map'}
          </h3>
          <p className="max-w-md text-sm text-gray-600">
            You can still use the location services and enter your address manually.
          </p>
          <div className="mt-4 text-xs text-gray-500">
            Current Location: {center.lat.toFixed(6)}, {center.lng.toFixed(6)}
          </div>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="h-[400px] w-full rounded-lg" />;
}