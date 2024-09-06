import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Weather = () => {
  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.locationText}>Gurgaon</Text>
      <Text style={styles.temperatureText}>32°C</Text>
      {/* Add additional weather details here, such as conditions, humidity, etc. */}
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  temperatureText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Weather;
