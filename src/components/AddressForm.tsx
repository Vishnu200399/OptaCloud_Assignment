import React from 'react';
import { Home, Building2, Users } from 'lucide-react';
import { AddressType } from '../types/address';

interface AddressFormProps {
  unit: string;
  area: string;
  type: AddressType;
  onUnitChange: (value: string) => void;
  onAreaChange: (value: string) => void;
  onTypeChange: (type: AddressType) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddressForm({
  unit,
  area,
  type,
  onUnitChange,
  onAreaChange,
  onTypeChange,
  onSubmit,
}: AddressFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
          House/Flat/Block No.
        </label>
        <input
          type="text"
          id="unit"
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter house/flat number"
        />
      </div>

      <div>
        <label htmlFor="area" className="block text-sm font-medium text-gray-700">
          Apartment/Road/Area
        </label>
        <input
          type="text"
          id="area"
          value={area}
          onChange={(e) => onAreaChange(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter area details"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address Type</label>
        <div className="mt-2 flex gap-4">
          <button
            type="button"
            onClick={() => onTypeChange('home')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
              type === 'home'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Home size={20} />
            Home
          </button>
          <button
            type="button"
            onClick={() => onTypeChange('office')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
              type === 'office'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Building2 size={20} />
            Office
          </button>
          <button
            type="button"
            onClick={() => onTypeChange('other')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
              type === 'other'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Users size={20} />
            Other
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Save Address
      </button>
    </form>
  );
}