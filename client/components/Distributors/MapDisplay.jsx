// src/components/MapDisplay.jsx
import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapDisplay = ({ locations }) => {
  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}>
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: location.lat, longitude: location.lng }}
            title={location.business_name}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapDisplay;
