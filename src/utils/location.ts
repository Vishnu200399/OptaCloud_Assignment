// Generates a random location within reasonable bounds
export const getRandomLocation = () => {
  // Random location roughly within United States bounds
  const lat = 37.0902 + (Math.random() - 0.5) * 10; // Around US center latitude
  const lng = -95.7129 + (Math.random() - 0.5) * 10; // Around US center longitude
  
  return { lat, lng };
};