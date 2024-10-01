import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import FertilizerForm from "../../components/Forms/FertilizerForm";
import Icon from "react-native-vector-icons/FontAwesome";
import CropCard from "../../components/Cards";

const fertilizerAPI = axios.create({
  // baseURL: "http://192.168.1.159:8000",
  baseURL: "http://192.168.21.141:8000",

  timeout: 50000,
});

const FertilizerSchedule = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [savedSchedule, setSavedSchedule] = useState([]); // Initialize as empty array
  const [showForm, setShowForm] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchSavedSchedule = async () => {
      setLoading(true);
      try {
        const response = await fertilizerAPI.get(
          // "http://192.168.1.159:8070/schedule/"
          "http://192.168.21.141:8070/schedule/"
        );
        setSavedSchedule(response.data || []); // Ensure it's an array
      } catch (error) {
        console.error("Failed to fetch saved schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedSchedule();
  }, []);

  const handleCardClick = (schedule) => {
    navigation.navigate("ScheduleDetails", { schedule });
  };

  const renderCard = (schedule) => {
    // Ensure schedule and crop_type exist
    const { _id, crop_type, imageUri } = schedule || {};

    return (
      <CropCard
        key={_id || Math.random().toString()} // Ensure a unique key
        imageUri={imageUri}
        crop_type={crop_type}
        onPress={() => handleCardClick(schedule)}
      />
    );
  };

  const handleWeatherDataUpdate = (data) => {
    setWeatherData(data);
  };

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
        setLoading(false);
        return;
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
      }
    } catch (err) {
      console.error("Failed to fetch the fertilizer schedule:", err);
    } finally {
      setLoading(false);
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
        <>
          {savedSchedule.length > 0 ? (
            savedSchedule.map(renderCard)
          ) : (
            <Text>No schedules available</Text>
          )}

          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => setShowForm(!showForm)}
          >
            <Icon name="plus" size={30} color="#fff" />
          </TouchableOpacity>

          {showForm && <FertilizerForm onSubmit={handleFormSubmit} />}
        </>
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
  floatingButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    backgroundColor: "#ff5722",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});

export default FertilizerSchedule;
