import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { MapPin, Search } from 'lucide-react';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onEnableLocation: () => void;
  onManualSearch: () => void;
}

export function LocationPermissionModal({
  isOpen,
  onEnableLocation,
  onManualSearch,
}: LocationPermissionModalProps) {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="text-xl font-semibold">
            Enable Location Services
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-gray-600">
            We need your location to provide better delivery service. Choose how you'd like to proceed:
          </Dialog.Description>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={onEnableLocation}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <MapPin size={20} />
              Enable Location
            </button>
            <button
              onClick={onManualSearch}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
            >
              <Search size={20} />
              Search Manually
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}