import { getRandomLocation } from './location';

const streets = ['Oak Street', 'Maple Avenue', 'Pine Road', 'Cedar Lane', 'Elm Boulevard'];
const buildings = ['Summit', 'Park View', 'Green Valley', 'Riverside', 'Highland'];
const numbers = ['A', 'B', 'C', 'D', 'E'];

export const generateRandomAddress = () => {
  const unit = `${Math.floor(Math.random() * 999) + 1}${numbers[Math.floor(Math.random() * numbers.length)]}`;
  const building = buildings[Math.floor(Math.random() * buildings.length)];
  const street = streets[Math.floor(Math.random() * streets.length)];
  
  return {
    unit: `${unit}`,
    area: `${building} Apartments, ${street}`
  };
};