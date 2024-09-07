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

      // Check if the response data contains the expected structure
      if (
        response.data &&
        response.data.schedule &&
        response.data.schedule.fertilizer_schedule
      ) {
        setLoading(false); // Stop loading after data is fetched
        navigation.navigate("ScheduleDetails", {
          schedule: response.data.schedule.fertilizer_schedule,
        }); // Navigate to ScheduleDetails screen with the schedule data
      } else {
        setLoading(false);
        console.error(
          "No valid fertilizer schedule data received:",
          response.data
        );
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
        <FertilizerForm onSubmit={handleFormSubmit} />
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
