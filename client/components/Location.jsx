import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const Location = ({ onLocationChange }) => {
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      onLocationChange(currentLocation);

      // Send location data to Flask backend
      // try {
      //   await fetch('http://your-flask-server-url/location', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       latitude: currentLocation.coords.latitude,
      //       longitude: currentLocation.coords.longitude,
      //     }),
      //   });
      // } catch (error) {
      //   console.error('Error sending location data to Flask:', error);
      // }
    })();
  }, []);

  return null; // This component does not need to render anything
};

export default Location;
