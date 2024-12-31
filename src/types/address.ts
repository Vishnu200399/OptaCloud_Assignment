export type AddressType = 'home' | 'office' | 'other';

export interface Location {
  lat: number;
  lng: number;
}

export interface Address {
  id: string;
  type: AddressType;
  formattedAddress: string;
  details: {
    unit: string;
    area: string;
  };
  location: Location;
  createdAt: Date;
}