// src/screens/DistributeScreen.jsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import SearchPrompt from '../components/SearchPrompt';
import MapDisplay from '../components/MapDisplay';

axios.defaults.baseURL = 'http://127.0.0.1:8070'; // Adjust to your backend URL

const DistributeScreen = () => {
  const [locations, setLocations] = useState([]);

  const handleSearch = async (fertiName) => {
    try {
      const { data } = await axios.get(`/Stock/available/${fertiName}`);
      const mappedLocations = data
        .filter(item => item.availability === 'Available')
        .map(item => ({
          business_name: item.business_name,
          lat: parseFloat(item.latitude),
          lng: parseFloat(item.longitude),
        }));
      setLocations(mappedLocations);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchPrompt onSearch={handleSearch} />
      {locations.length > 0 ? (
        <MapDisplay locations={locations} />
      ) : (
        <Text style={{ textAlign: 'center', margin: 20 }}>No available places found.</Text>
      )}
    </View>
  );
};

export default DistributeScreen;
