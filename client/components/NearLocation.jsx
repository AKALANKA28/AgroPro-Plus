import React, { useState, useEffect } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const NearLocation = ({ onLocationChange }) => {
  const [location, setLocation] = useState(null);
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        getCurrentLocation();
      }
    };

    requestLocationPermission();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        onLocationChange({ latitude, longitude });
        fetchNearbyDistributors(latitude, longitude);
      },
      (error) => {
        console.log('Error getting location:', error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const fetchNearbyDistributors = async (latitude, longitude) => {
    setLoading(true);
    try {
      const response = await axios.get(`YOUR_BACKEND_URL/api/distributors`, {
        params: {
          latitude,
          longitude,
        },
      });
      setDistributors(response.data);
    } catch (error) {
      console.error('Error fetching nearby distributors:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <Text style={styles.locationText}>
          Your Location: {location.latitude}, {location.longitude}
        </Text>
      ) : (
        <Text>Fetching location...</Text>
      )}
      
      <TouchableOpacity style={styles.refreshButton} onPress={getCurrentLocation}>
        <Text style={styles.refreshButtonText}>Refresh Location</Text>
      </TouchableOpacity>
      
      {loading ? (
        <Text style={styles.loadingText}>Loading distributors...</Text>
      ) : (
        <FlatList
          data={distributors}
          renderItem={({ item }) => (
            <View style={styles.distributorItem}>
              <Text style={styles.distributorText}>{item.business_name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Add your updated styles here
});

export default NearLocation;
