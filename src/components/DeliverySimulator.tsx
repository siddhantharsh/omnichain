import React from 'react';
import Map, { Source, Layer, Marker } from 'react-map-gl';
import { motion } from 'framer-motion';
import { Truck, Drone, Bot } from 'lucide-react';

interface DeliverySimulatorProps {
  deliveryStatus: {
    progress: number; // 0-100
    mode: 'drone' | 'ev' | 'robot';
    co2SavedKg: number;
  };
  route: GeoJSON.Feature<GeoJSON.LineString>;
  hubLocation: [number, number];
  userLocation: [number, number];
}

const MODE_ICONS = {
  drone: Drone,
  ev: Truck,
  robot: Bot,
};

const DeliverySimulator: React.FC<DeliverySimulatorProps> = ({ deliveryStatus, route, hubLocation, userLocation }) => {
  // Calculate marker position along the route based on progress
  const coordinates = route.geometry.coordinates;
  const progressIdx = Math.floor((deliveryStatus.progress / 100) * (coordinates.length - 1));
  const markerPos = coordinates[progressIdx] || coordinates[coordinates.length - 1];
  const ModeIcon = MODE_ICONS[deliveryStatus.mode];

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm mb-6" style={{ height: 400 }}>
      <Map
        initialViewState={{ longitude: hubLocation[0], latitude: hubLocation[1], zoom: 12 }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {/* Route line */}
        <Source id="route" type="geojson" data={route}>
          <Layer
            id="route-layer"
            type="line"
            paint={{ 'line-color': '#00ffff', 'line-width': 4, 'line-dasharray': [2, 2] }}
          />
        </Source>
        {/* Hub marker */}
        <Marker longitude={hubLocation[0]} latitude={hubLocation[1]} anchor="bottom">
          <div className="w-4 h-4 bg-wmt-blue rounded-full border-2 border-white shadow" />
        </Marker>
        {/* User marker */}
        <Marker longitude={userLocation[0]} latitude={userLocation[1]} anchor="bottom">
          <div className="w-4 h-4 bg-wmt-accent-green rounded-full border-2 border-white shadow" />
        </Marker>
        {/* Animated delivery marker */}
        <Marker longitude={markerPos[0]} latitude={markerPos[1]} anchor="center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center bg-white rounded-full shadow p-2 border-2 border-wmt-accent-cyan"
          >
            <ModeIcon className="text-wmt-accent-cyan" size={28} />
          </motion.div>
        </Marker>
      </Map>
      <div className="flex items-center justify-between p-4 bg-white border-t border-wmt-gray-100">
        <div className="flex items-center gap-2">
          <ModeIcon className="text-wmt-accent-cyan" size={20} />
          <span className="text-wmt-dark font-medium capitalize">{deliveryStatus.mode}</span>
        </div>
        <div className="text-wmt-dark font-medium">CO₂ Saved: <span className="text-wmt-accent-green">{deliveryStatus.co2SavedKg} kg</span></div>
        <div className="text-wmt-dark font-medium">Progress: {deliveryStatus.progress}%</div>
      </div>
    </div>
  );
};

export default DeliverySimulator;
