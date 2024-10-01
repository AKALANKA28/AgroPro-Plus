import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DistributerLocationMap = ({ Distribute }) => {
  const mapCenter = [7.8731, 80.7718]; // Center of Sri Lanka
  const mapZoom = 7; // Initial zoom level

  const [DistributerCounts, setDistributerCounts] = useState({});
  const [hoveredDistributer, setHoveredDistributer] = useState(null);

  // Calculate the total number of Distributers for each city
  useEffect(() => {
    const counts = Distribute.reduce((acc, Distribute) => {
      if (Distribute.latitude && Distribute.longitude && Distribute.city) {
        acc[Distribute.city] = (acc[Distribute.city] || 0) + 1;
      }
      return acc;
    }, {});
    setDistributerCounts(counts);
  }, [Distribute]);

  // Define custom icon for markers
  const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Ref for markers
  const markersRef = useRef([]);

  useEffect(() => {
    markersRef.current = Array(Distribute.length)
      .fill()
      .map((_, index) => markersRef.current[index] || React.createRef());
  }, [Distribute]);

  const handleMouseOver = (city) => {
    setHoveredDistributer(city);
  };

  const handleMouseOut = () => {
    setHoveredDistributer(null);
  };

  return (
    <div style={{ height: '500px', borderRadius: '15px', overflow: 'hidden' }}>
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {Distribute.map((Distribute, index) => (
          Distribute.latitude &&
          Distribute.longitude && (
            <Marker
              key={Distribute._id}
              position={[parseFloat(Distribute.latitude), parseFloat(Distribute.longitude)]}
              icon={redIcon}
              ref={markersRef.current[index]}
              eventHandlers={{
                mouseover: () => handleMouseOver(Distribute.city),
                mouseout: () => handleMouseOut(),
              }}
            >
              {(hoveredDistributer === Distribute.city) && (
                <Popup>{Distribute.city}: {DistributerCounts[Distribute.city] || 0} Distributers</Popup>
              )}
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default DistributerLocationMap;
