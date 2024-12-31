import { create } from 'zustand';
import { Address } from '../types/address';

interface AddressStore {
  addresses: Address[];
  selectedAddress: Address | null;
  addAddress: (address: Address) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setSelectedAddress: (address: Address | null) => void;
}

export const useAddressStore = create<AddressStore>((set) => ({
  addresses: [],
  selectedAddress: null,
  addAddress: (address) =>
    set((state) => ({ addresses: [...state.addresses, address] })),
  updateAddress: (id, updatedAddress) =>
    set((state) => ({
      addresses: state.addresses.map((addr) =>
        addr.id === id ? { ...addr, ...updatedAddress } : addr
      ),
    })),
  deleteAddress: (id) =>
    set((state) => ({
      addresses: state.addresses.filter((addr) => addr.id !== id),
    })),
  setSelectedAddress: (address) => set({ selectedAddress: address }),
}));