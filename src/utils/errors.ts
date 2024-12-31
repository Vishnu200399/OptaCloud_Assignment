export const isGoogleMapsError = (error: Error): boolean => {
  return error.message.includes('Google Maps JavaScript API error');
};

export const getGoogleMapsErrorType = (error: Error): 'billing_not_enabled' | 'invalid_key' | 'unknown' => {
  if (error.message.includes('BillingNotEnabled')) {
    return 'billing_not_enabled';
  }
  if (error.message.includes('InvalidKey')) {
    return 'invalid_key';
  }
  return 'unknown';
};