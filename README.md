# Delivery Locations Manager

A React application for managing delivery locations with Google Maps integration. Users can add, edit, and manage multiple delivery addresses with precise location picking.

## Features

- 📍 Interactive Google Maps integration
- 📱 Current location detection
- 🏠 Multiple address types (Home, Office, Other)
- ✏️ Edit and delete saved addresses
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Google Maps JavaScript API
- Zustand (State Management)
- Radix UI (UI Components)
- Lucide Icons

## Project Structure

```
src/
├── components/         # React components
├── services/          # External services (Maps)
├── store/             # State management
├── types/             # TypeScript types
└── utils/             # Utility functions
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your Google Maps API key:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Features in Detail

### Address Management
- Add new delivery addresses
- Specify address type (Home/Office/Other)
- Edit existing addresses
- Delete unwanted addresses

### Location Features
- Pick location from map
- Use current location
- Reverse geocoding for address details
- Interactive map marker

### UI/UX
- Toast notifications for user feedback
- Responsive design for all screen sizes
- Clean and modern interface
- Intuitive address type selection

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
