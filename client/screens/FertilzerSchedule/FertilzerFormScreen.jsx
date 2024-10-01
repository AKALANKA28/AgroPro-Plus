import React, { useState } from 'react'; // Import useState
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native'; // Import Alert for error handling
import FertilizerForm from '../../components/Forms/FertilizerForm'; // Import the form component
import axios from 'axios'; // Import axios
const FertilizerFormScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false); // State for loading
  const [weatherData, setWeatherData] = useState(null);

  const fertilizerAPI = axios.create({
    baseURL: "http://192.168.1.159:8000",
    // baseURL: "http://192.168.21.141:8000",
  
    timeout: 50000,
  });
  const fetchFertilizerSchedule = async (formData) => {
    setLoading(true);
    try {
      const response = await fertilizerAPI.post("/generate_schedule", {
        crop_type: formData.cropType,
        planting_date: formData.plantingDate,
        area_size: formData.areaSize,
        soil_condition: formData.soilCondition,
        weather_forecast: weatherData,
      });

      let parsedData;
      try {
        if (typeof response.data === "string") {
          parsedData = JSON.parse(
            response.data.replace(/\\"/g, '"').replace(/^"|"$/g, "")
          );
        } else {
          parsedData = response.data;
        }
      } catch (error) {
        console.error("Failed to parse the response:", error);
        Alert.alert("Error", "Failed to parse the response.");
        return; // Early return if parsing fails
      }

      if (parsedData.schedule && parsedData.schedule.fertilizer_schedule) {
        navigation.navigate("ScheduleDetails", {
          schedule: parsedData.schedule.fertilizer_schedule,
        });
      } else {
        console.error(
          "No valid fertilizer schedule data received:",
          parsedData
        );
        Alert.alert("Error", "No valid schedule data received.");
      }
    } catch (err) {
      console.error("Failed to fetch the fertilizer schedule:", err);
      Alert.alert("Error", "Failed to fetch the fertilizer schedule.");
    } finally {
      setLoading(false);
    }
  };

  const handleWeatherDataUpdate = (data) => {
    setWeatherData(data);
  };

  const handleFormSubmit = (formData) => {
    console.log('Form data submitted:', formData);
    fetchFertilizerSchedule(formData); // Call fetchFertilizerSchedule with form data
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
