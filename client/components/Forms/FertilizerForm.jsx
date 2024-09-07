import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

const FertilizerForm = ({ onSubmit }) => {
  const [cropType, setCropType] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [soilCondition, setSoilCondition] = useState("");
  const [weatherForecast, setWeatherForecast] = useState("");
  const [error, setError] = useState(null);
  const navigation = useNavigation(); // Get navigation object to go back
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Show or hide the date picker
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  // Handle date change
  const onDateChange = (event, date) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
      setPlantingDate(formattedDate);
      setSelectedDate(date);
    }
    if (Platform.OS === "android") {
      setShowDatePicker(false); // Hide date picker on Android after selection
    }
  };
  const handleSubmit = () => {
    if (cropType && plantingDate && soilCondition && weatherForecast) {
      onSubmit({
        cropType,
        plantingDate,
        soilCondition,
        weatherForecast,
      });
      setError(null);
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header with back arrow and centered title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fertilizer Schedule</Text>
        <View style={{ width: 24 }} />
        {/* Placeholder to balance the back arrow */}
      </View>

      <View>
        <Text style={styles.title}>
          Enter details to fetch fertilizer schedule{" "}
        </Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Crop Type:</Text>
        <TextInput
          style={styles.input}
          value={cropType}
          onChangeText={setCropType}
          placeholder="Enter crop type"
        />
        <Text style={styles.label}>Planting Date:</Text>
        <View>
          <TextInput
            style={styles.input}
            value={plantingDate}
            placeholder="Enter planting date (YYYY-MM-DD)"
            onFocus={showDatepicker} // Show date picker on input focus
          />

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()} // Optional: limit to past dates
            />
          )}
        </View>
        <Text style={styles.label}>Soil Condition:</Text>
        <TextInput
          style={styles.input}
          value={soilCondition}
          onChangeText={setSoilCondition}
          placeholder="Enter soil condition"
        />
        <Text style={styles.label}>Weather Forecast:</Text>
        <TextInput
          style={styles.input}
          value={weatherForecast}
          onChangeText={setWeatherForecast}
          placeholder="Enter weather forecast"
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Fetch Schedule</Text>
          </View>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  form: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 25,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
    marginBottom: 15,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.08,
    // shadowRadius: 2,
    // elevation: 2, // Adds a subtle shadow on Android
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3, // Adds a subtle shadow for the button
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "500",
  },
});

export default FertilizerForm;
