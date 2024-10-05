import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import BackIcon from './BackIcon'; // Assuming BackIcon is in the same directory

const MapDisplay = ({ locations, navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);

  // Hardcoded user location (latitude and longitude)
  const hardcodedUserLocation = {
    latitude: 6.8588258, // Example latitude (Bangalore, India)
    longitude: 80.0246893, // Example longitude (Bangalore, India)
  };

  useEffect(() => {
    // Set hardcoded user location instead of fetching dynamically
    setUserLocation(hardcodedUserLocation);
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

  useEffect(() => {
    // Center the map on the first location in the locations array if it exists
    if (locations.length > 0 && mapRef.current) {
      const { lat, lng } = locations[0]; // Assuming locations has at least one element
      mapRef.current.animateToRegion(
        {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  }, [locations]);

  return (
    <View style={{ flex: 1 }}>
      {/* Back icon button */}
      <BackIcon onPress={() => navigation.goBack()} />

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
            {/* Custom icon for distributor locations using Image */}
            <Image
              source={require('../../assets/mapIcon.png')}
              style={{ width: 30, height: 30 }} // Adjust the width and height here to control icon size
            />
            {/* Callout for additional information */}
            <Callout>
              <View>
                <Text>{location.business_name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {/* User's hardcoded location marker */}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="You are here"
            pinColor="red"
          />
        )}
      </MapView>

      {/* Floating button for user location */}
      {userLocation && (
        <TouchableOpacity
          style={styles.userLocationButton}
          onPress={centerMapOnUserLocation}
        >
          <Icon name="locate-outline" size={20} color="white" />
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
    backgroundColor: "#607F0E",
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
