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
import Icon from "react-native-vector-icons/FontAwesome";
import CropCard from "../../components/Cards";
import Header from "../../components/Header";

const FertilizerSchedule = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [savedSchedule, setSavedSchedule] = useState([]); // Initialize as empty array

  const navigation = useNavigation();

  useEffect(() => {
    const fetchSavedSchedule = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "/schedule/"
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
    navigation.navigate("ScheduleDetails", { schedule }); // Navigate to ScheduleDetails with the schedule data
  };

  const renderCard = (schedule) => {
    const { _id, crop_type, imageUri } = schedule || {};

    return (
      <CropCard
        key={_id || Math.random().toString()} // Ensure a unique key
        imageUri={imageUri}
        crop_type={crop_type}
        onPress={() => handleCardClick(schedule)} // When a card is clicked, navigate with schedule data
      />
    );
  };

  return (
    <>
      <Header title="Fertilizer Schedule" />
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
          </>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("FertilizerFormScreen")} // Navigate to the new form screen
      >
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </>
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
    bottom: 20, 
    right: 20, 
    backgroundColor: "#183719", 
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default FertilizerSchedule;
