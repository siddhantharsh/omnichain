import React from 'react';
import DeliverySimulator from '../../components/DeliverySimulator';

// Mock delivery status and route for demo
const mockDeliveryStatus = {
  progress: 60,
  mode: 'drone' as const,
  co2SavedKg: 12.5,
};
const mockHubLocation: [number, number] = [-73.935242, 40.73061];
const mockUserLocation: [number, number] = [-73.955242, 40.73561];
const mockRoute = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: [
      mockHubLocation,
      [-73.945242, 40.73261],
      mockUserLocation,
    ],
  },
  properties: {},
};

const DeliveryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-wmt-gray-100 p-8">
      <header className="bg-wmt-blue text-white rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-semibold">Last-Mile Delivery Simulator</h1>
      </header>
      <main className="max-w-2xl mx-auto">
        <DeliverySimulator
          deliveryStatus={mockDeliveryStatus}
          route={mockRoute}
          hubLocation={mockHubLocation}
          userLocation={mockUserLocation}
        />
      </main>
    </div>
  );
};

export default DeliveryPage;
