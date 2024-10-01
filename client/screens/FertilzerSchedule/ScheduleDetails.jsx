import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import axios from "axios";

const ScheduleDetails = ({ route }) => {
  const { schedule } = route.params;

  const saveScheduleToDB = async () => {
    // Assuming you need to convert nitrogen and pH to numbers
    const formattedSchedule = {
      ...schedule,
      soil_condition: {
        nitrogen: parseFloat(schedule.soil_condition.nitrogen) || 0,
        pH: parseFloat(schedule.soil_condition.pH) || 0,
      },
    };

    try {
      const response = await axios.post(
        "http://192.168.1.159:8070/schedule/save",
        { schedule: formattedSchedule }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Fertilizer schedule saved successfully!");
      } else {
        Alert.alert("Error", "Failed to save the fertilizer schedule.");
      }
    } catch (error) {
      console.error("Failed to save schedule:", error);
      Alert.alert("Error", "An error occurred while saving the schedule.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Fertilizer Schedule for {schedule.crop_type}
      </Text>
      <Text style={styles.subtitle}>
        Planting Date: {schedule.planting_date}
      </Text>
      <Text style={styles.subtitle}>
        Area Size: {schedule.area_size}
      </Text>
      <Text style={styles.subtitle}>Soil Condition:</Text>
      <Text style={styles.text}>
        Nitrogen: {schedule.soil_condition.nitrogen}
      </Text>
      <Text style={styles.text}>pH: {schedule.soil_condition.pH}</Text>
      {/* <Text style={styles.subtitle}>Weather Forecast:</Text>
      <Text style={styles.weatherText}>
        Temperature: {schedule.weather_forecast.temperature}°C
      </Text>
      <Text style={styles.weatherText}>
        Rainfall: {schedule.weather_forecast.rainfall}mm
      </Text>
      <Text style={styles.weatherText}>
        Forecast: {schedule.weather_forecast.forecast}
      </Text> */} 

      {schedule.growth_stages.map((stage, index) => (
        <View key={index} style={styles.stageContainer}>
          <Text style={styles.stageTitle}>Stage: {stage.stage}</Text>
          <Text style={styles.text}>Amount: {stage.amount}</Text>
          <Text style={styles.text}>
            Application Date: {stage.application_date}
          </Text>
          <Text style={styles.text}>
            Fertilizer Type: {stage.fertilizer_type}
          </Text>
          <Text style={styles.text}>Notes: {stage.notes}</Text>
        </View>
      ))}

      <Button title="Save Schedule" onPress={saveScheduleToDB} />
      {/* <Button title="Go Back" onPress={() => navigation.goBack()} /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
  stageContainer: {
    marginVertical: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  stageTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ScheduleDetails;
