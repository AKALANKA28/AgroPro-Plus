import React, { useEffect, useState, useRef } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Ionicons';

const MapDisplay = ({ locations }) => {
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getUserLocation();
  }, []);

  const centerMapOnUserLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        region={{
          latitude: userLocation ? userLocation.latitude : 0,
          longitude: userLocation ? userLocation.longitude : 0,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Render other location markers */}
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: location.lat, longitude: location.lng }}
            title={location.business_name} // Display business name as title
          >
            {/* Callout for additional information */}
            <Callout>
              <View>
                <Text>{location.business_name}</Text>
                {/* <Text>{location.situated_place || "Location not specified"}</Text> */}
              </View>
            </Callout>
          </Marker>
        ))}

        {/* User's location marker */}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="You are here"
            pinColor="blue"
          />
        )}
      </MapView>

      {/* Floating button for user location */}
      {userLocation && (
        <TouchableOpacity
          style={styles.userLocationButton}
          onPress={centerMapOnUserLocation}
        >
          <Icon name="locate-outline" size={30} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  userLocationButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default MapDisplay;
