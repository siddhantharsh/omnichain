import React, { useState } from 'react';
import InventoryTable from '../../components/InventoryTable';
import RerouteModal from '../../components/RerouteModal';
import MapView from '../../components/MapView';
import { useInventory } from '../../utils/hooks/useInventory';
import { HubInventory } from '../../utils/api';

// Mock destinations for demo (replace with real data from API in future)
const mockDestinations = [
  { id: 'hub2', name: 'Partner Hub 2', type: 'hub' },
  { id: 'hub3', name: 'Partner Hub 3', type: 'hub' },
  { id: 'fb1', name: 'Food Bank 1', type: 'foodbank' },
  { id: 'fb2', name: 'Food Bank 2', type: 'foodbank' },
];

// Mock GeoJSON for hubs and food banks
const mockHubs = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-73.935242, 40.73061] },
      properties: { id: 'hub1', name: 'Main Hub' },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-73.925242, 40.74061] },
      properties: { id: 'hub2', name: 'Partner Hub 2' },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-73.945242, 40.72061] },
      properties: { id: 'hub3', name: 'Partner Hub 3' },
    },
  ],
};
const mockFoodbanks = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-73.955242, 40.73561] },
      properties: { id: 'fb1', name: 'Food Bank 1' },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-73.965242, 40.72561] },
      properties: { id: 'fb2', name: 'Food Bank 2' },
    },
  ],
};

const AdminDashboard: React.FC = () => {
  const { data, isLoading, error } = useInventory();
  const [selectedItem, setSelectedItem] = useState<HubInventory | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleReroute = (item: HubInventory) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const handleModalSubmit = (qty: number, destination: string) => {
    // TODO: Call rerouteInventory API
    alert(`Rerouting ${qty} units of ${selectedItem?.name} to ${destination}`);
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-wmt-gray-100 p-8">
      <header className="bg-wmt-blue text-white rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-semibold">Micro-Hub Manager Dashboard</h1>
      </header>
      <main className="space-y-8">
        <MapView hubs={mockHubs} foodbanks={mockFoodbanks} />
        {isLoading && <div>Loading inventory...</div>}
        {error && <div className="text-red-500">Error loading inventory.</div>}
        {data && (
          <InventoryTable inventory={data.data} onReroute={handleReroute} />
        )}
        <RerouteModal
          open={modalOpen}
          item={selectedItem}
          destinations={mockDestinations}
          onSubmit={handleModalSubmit}
          onClose={handleModalClose}
        />
      </main>
    </div>
  );
};

export default AdminDashboard;
