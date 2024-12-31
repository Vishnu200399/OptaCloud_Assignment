import React from 'react';
import { Home, Building2, Users, Trash2, Edit } from 'lucide-react';
import { Address, AddressType } from '../types/address';

interface AddressListProps {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
}

const getIcon = (type: AddressType) => {
  switch (type) {
    case 'home':
      return <Home className="text-blue-600" size={24} />;
    case 'office':
      return <Building2 className="text-green-600" size={24} />;
    case 'other':
      return <Users className="text-purple-600" size={24} />;
  }
};

export function AddressList({ addresses, onEdit, onDelete }: AddressListProps) {
  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 shadow-sm"
        >
          <div className="flex-shrink-0">{getIcon(address.type)}</div>
          <div className="flex-grow">
            <h3 className="font-medium capitalize">{address.type}</h3>
            <p className="text-sm text-gray-600">{address.formattedAddress}</p>
            <p className="text-sm text-gray-500">
              {address.details.unit}, {address.details.area}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(address)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={() => onDelete(address.id)}
              className="rounded-lg p-2 text-red-600 hover:bg-red-50"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}