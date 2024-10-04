import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import FertilizerForm from '../../components/Forms/FertilizerForm';
import axios from 'axios';

const FertilizerFormScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  // Create a reusable instance of axios
  const fertilizerAPI = axios.create({
    baseURL: "http://192.168.1.159:8000",
    timeout: 50000,
  });

  // Function to fetch fertilizer schedule
  const fetchFertilizerSchedule = async (formData) => {
    setLoading(true);
    try {
      // API request
      const { data } = await fertilizerAPI.post("/generate_schedule", {
        crop_type: formData.cropType,
        planting_date: formData.plantingDate,
        area_size: formData.areaSize,
        soil_condition: formData.soilCondition,
        weather_forecast: weatherData || null,  // Gracefully handle null weather data
      });

      // Check if valid data is received
      if (data.schedule && data.schedule.fertilizer_schedule) {
        navigation.navigate("ScheduleDetails", {
          schedule: data.schedule.fertilizer_schedule,
        });
      } else {
        console.error("No valid fertilizer schedule data received:", data);
        Alert.alert("Error", "No valid schedule data received.");
      }

    } catch (error) {
      console.error("Failed to fetch the fertilizer schedule:", error);
      Alert.alert("Error", "Failed to fetch the fertilizer schedule.");
    } finally {
      setLoading(false);
    }
  };

  // Handle weather data updates
  const handleWeatherDataUpdate = (data) => setWeatherData(data);

  // Handle form submission
  const handleFormSubmit = (formData) => {
    console.log('Form data submitted:', formData);
    fetchFertilizerSchedule(formData);  // Fetch schedule based on form data
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <FertilizerForm onSubmit={handleFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default FertilizerFormScreen;
