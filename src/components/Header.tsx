import React from 'react';
import { MapPin } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="flex items-center gap-2">
          <MapPin className="text-blue-600" size={24} />
          <h1 className="text-xl font-semibold">Delivery Locations</h1>
        </div>
      </div>
    </header>
  );
}