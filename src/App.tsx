import React, { useState } from 'react';
import { Header } from './components/Header';
import { LocationInput } from './components/LocationInput';
import { AddressForm } from './components/AddressForm';
import { AddressList } from './components/AddressList';
import { useAddressStore } from './store/useAddressStore';
import { Address, AddressType, Location } from './types/address';

export default function App() {
  const [location, setLocation] = useState<Location>({
    lat: 40.7128,
    lng: -74.0060,
  });
  const [unit, setUnit] = useState('');
  const [area, setArea] = useState('');
  const [addressType, setAddressType] = useState<AddressType>('home');
  const { addresses, addAddress, deleteAddress } = useAddressStore();

  const handleAddressGenerated = (address: { unit: string; area: string }) => {
    setUnit(address.unit);
    setArea(address.area);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAddress: Address = {
      id: crypto.randomUUID(),
      type: addressType,
      formattedAddress: `${unit}, ${area}`,
      details: {
        unit,
        area,
      },
      location,
      createdAt: new Date(),
    };

    addAddress(newAddress);
    setUnit('');
    setArea('');
    setAddressType('home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <LocationInput 
              location={location} 
              onLocationChange={setLocation}
              onAddressGenerated={handleAddressGenerated}
            />
            <AddressForm
              unit={unit}
              area={area}
              type={addressType}
              onUnitChange={setUnit}
              onAreaChange={setArea}
              onTypeChange={setAddressType}
              onSubmit={handleSubmit}
            />
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold">Saved Addresses</h2>
            <AddressList
              addresses={addresses}
              onEdit={(address) => {
                setUnit(address.details.unit);
                setArea(address.details.area);
                setAddressType(address.type);
                setLocation(address.location);
              }}
              onDelete={deleteAddress}
            />
          </div>
        </div>
      </main>
    </div>
  );
}