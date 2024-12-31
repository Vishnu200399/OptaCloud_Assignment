import { Loader } from '@googlemaps/js-api-loader';

class MapsService {
  private static loader: Loader;
  private static isInitialized = false;
  private static loadError: Error | null = null;

  static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      throw new Error('Google Maps API key is not configured');
    }

    try {
      this.loader = new Loader({
        apiKey,
        version: 'weekly',
      });
      await this.loader.load();
      this.isInitialized = true;
    } catch (error) {
      this.loadError = error as Error;
      throw error;
    }
  }

  static async reverseGeocode(location: google.maps.LatLngLiteral): Promise<string> {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      throw new Error('Google Maps API key is not configured');
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}`
      );
      const data = await response.json();
      
      if (data.error_message) {
        throw new Error(`Google Maps API error: ${data.error_message}`);
      }
      
      return data.results[0]?.formatted_address || '';
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  }

  static getLoadError(): Error | null {
    return this.loadError;
  }

  static isLoaded(): boolean {
    return this.isInitialized;
  }
}

export { MapsService };