import React from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import { motion } from 'framer-motion';

// Types for GeoJSON features
interface MapViewProps {
  hubs: GeoJSON.FeatureCollection;
  foodbanks: GeoJSON.FeatureCollection;
  reroutePath?: GeoJSON.Feature | null; // LineString for animation
}

const HUB_COLOR = '#0071ce';
const FOODBANK_COLOR = '#00cc66';

const MapView: React.FC<MapViewProps> = ({ hubs, foodbanks, reroutePath }) => {
  // Default map center (could be dynamic)
  const center = hubs.features[0]?.geometry?.coordinates || [0, 0];

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm" style={{ height: 400 }}>
      <Map
        initialViewState={{ longitude: center[0], latitude: center[1], zoom: 10 }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {/* Hubs */}
        <Source id="hubs" type="geojson" data={hubs}>
          <Layer
            id="hubs-layer"
            type="circle"
            paint={{ 'circle-radius': 8, 'circle-color': HUB_COLOR, 'circle-stroke-width': 2, 'circle-stroke-color': '#fff' }}
          />
        </Source>
        {/* Food Banks */}
        <Source id="foodbanks" type="geojson" data={foodbanks}>
          <Layer
            id="foodbanks-layer"
            type="circle"
            paint={{ 'circle-radius': 8, 'circle-color': FOODBANK_COLOR, 'circle-stroke-width': 2, 'circle-stroke-color': '#fff' }}
          />
        </Source>
        {/* Animated reroute path (placeholder) */}
        {reroutePath && (
          <Source id="reroute-path" type="geojson" data={reroutePath}>
            <Layer
              id="reroute-path-layer"
              type="line"
              paint={{ 'line-color': '#00ffff', 'line-width': 4, 'line-dasharray': [2, 2] }}
            />
          </Source>
        )}
        {/* Example animated marker (Framer Motion placeholder) */}
        {/* <motion.div animate={{ x: 100 }} /> */}
      </Map>
    </div>
  );
};

export default MapView;
