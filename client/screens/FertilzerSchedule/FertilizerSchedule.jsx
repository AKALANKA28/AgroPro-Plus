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
import Header from "../../components/Header";
import ScheduleCard from "../../components/ScheduleCard";
import { Ionicons } from "@expo/vector-icons";

const FertilizerSchedule = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [savedSchedule, setSavedSchedule] = useState([]); // Initialize as empty array

  const navigation = useNavigation();

  useEffect(() => {
    fetchSavedSchedule();
  }, []);

  // Fetch the schedules from the database
  const fetchSavedSchedule = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/schedule/");
      setSavedSchedule(response.data || []); // Ensure it's an array
    } catch (error) {
      console.error("Failed to fetch saved schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle the deletion of a schedule
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to the backend
      await axios.delete(`/schedule/${id}`);

      // After successful deletion, remove the card from the state
      setSavedSchedule((prevSchedules) =>
        prevSchedules.filter((schedule) => schedule._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete schedule:", error);
    }
  };

  const handleCardClick = (schedule) => {
    navigation.navigate("ScheduleDetails", { schedule }); // Navigate to ScheduleDetails with the schedule data
  };

  const renderCard = (schedule) => {
    const { _id, crop_type, imageUri, week } = schedule || {};

    return (
      <ScheduleCard
        key={_id}
        imageUri={imageUri}
        crop_type={crop_type}
        week={week}
        onPress={() => handleCardClick(schedule)} // When a card is clicked, navigate with schedule data
        onDelete={() => handleDelete(_id)} // Pass the delete handler
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
        <Text style={styles.floatingButtonText}>Generate Schedule</Text>
        {/* <Ionicons name="add" size={40} color="#fff" /> */}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
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
    backgroundColor: "#607F0E",
    borderRadius: 50,
    width: 170,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 20,
    // fontFamily: "roboto-medium",
    fontWeight: "900",
  },
});

export default FertilizerSchedule;
