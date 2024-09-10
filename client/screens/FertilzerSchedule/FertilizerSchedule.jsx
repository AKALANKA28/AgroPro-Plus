import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  View,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import FertilizerForm from "../../components/Forms/FertilizerForm";

const fertilizerAPI = axios.create({
  baseURL: "http://192.168.1.159:8000",
  timeout: 50000,
});

const FertilizerSchedule = () => {
  const [loading, setLoading] = useState(false); // Manage loading state
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation(); // Use navigation hook

  const weatherData = {
    // Example weather data
    temperature: 25,
    rainfall: 10,
    forecast: 'Partly cloudy',
  };

  console.log("Weather Data in Parent Component:", weatherData);

  const fetchFertilizerSchedule = async (formData) => {
    setLoading(true); // Start loading when API call begins
    try {
      const response = await fertilizerAPI.post("/generate_schedule", {
        crop_type: formData.cropType,
        planting_date: formData.plantingDate,
        soil_condition: formData.soilCondition,
        weather_forecast: formData.weatherForecast,
      });
  
      // Log the full response for debugging
      console.log("API Response:", response.data);
  
      let parsedData;
      try {
        // Check if response is already an object, otherwise parse it
        if (typeof response.data === "string") {
          // Parse double-escaped JSON response if it's a string
          parsedData = JSON.parse(response.data.replace(/\\"/g, '"').replace(/^"|"$/g, ''));
        } else {
          parsedData = response.data;
        }
  
        console.log("Parsed Data:", parsedData);
  
      } catch (error) {
        console.error("Failed to parse the response:", error);
        setLoading(false);
        return;
      }
  
      // Now you can use the parsed data
      if (parsedData.schedule && parsedData.schedule.fertilizer_schedule) {
        setLoading(false); // Stop loading after data is fetched
        navigation.navigate("ScheduleDetails", {
          schedule: parsedData.schedule.fertilizer_schedule,
        });
      } else {
        setLoading(false);
        console.error("No valid fertilizer schedule data received:", parsedData);
      }
    } catch (err) {
      setLoading(false);
      console.error("Failed to fetch the fertilizer schedule:", err);
    }
  };
  
  
  const handleFormSubmit = (formData) => {
    fetchFertilizerSchedule(formData);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} />}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FertilizerForm onSubmit={handleFormSubmit} weatherData={weatherData} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});

export default FertilizerSchedule;
