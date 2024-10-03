import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import Header from "../Header";

const FertilizerForm = ({ onSubmit }) => {
  const [cropType, setCropType] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [soilCondition, setSoilCondition] = useState("");
  const [areaSize, setAreaSize] = useState("");
  const [error, setError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Show or hide the date picker
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const navigation = useNavigation();

  // Handle date change
  const onDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === "ios"); // Keep date picker open on iOS if needed
    if (date) {
      const formattedDate = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
      setPlantingDate(formattedDate);
      setSelectedDate(date);
    }
  };

  const handleSubmit = () => {
    if (cropType && plantingDate && soilCondition && areaSize) {
      onSubmit({
        cropType,
        plantingDate,
        soilCondition,
        areaSize,
      });
      setError(null);
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header with back arrow and centered title */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Details</Text>
        <View style={{ width: 24 }} />
      </View> */}

<Header title="Add Details"/>

      <View style={styles.form}>
        <Text style={styles.label}>Crop Type:</Text>
        <RNPickerSelect
          onValueChange={(value) => setCropType(value)}
          items={[
            { label: "Rice", value: "rice" },
            { label: "Corn", value: "corn" },
            { label: "Soybeans", value: "soybeans" },
            { label: "Watermelon", value: "watermelon" },
            { label: "Onion", value: "onion" },

          ]}
          placeholder={{ label: "Select a crop type", value: null }}
          style={pickerSelectStyles}
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
        <Text style={styles.label}>Area Size:</Text>
        <TextInput
          style={styles.input}
          value={areaSize}
          onChangeText={setAreaSize}
          placeholder="Enter your area size in acres"
        />
        <Text style={styles.label}>Soil Type:</Text>
        <RNPickerSelect
          onValueChange={(value) => setSoilCondition(value)}
          items={[
            { label: "Reddish Brown Earth Soil", value: "Reddish Brown Earths" },
            { label: "Noncalcic Brown Soil", value: "Noncalcic Brown Soil" },
            { label: "Reddish Brown Lateritic Soil", value: "Reddish Brown Lateritic Soil" },
            { label: "Red-Yellow Podzolic Soil", value: "Red-Yellow Podzolic Soil" },
            { label: "Immature Brown Loams", value: "Immature Brown Loams" },
            { label: "Grumusols", value: "Grumusols" },
            { label: "Solodized Solonetz", value: "Solodized Solonetz" },
            { label: "Low-Humic Gley Soils", value: "Low-Humic Gley Soils" },
            { label: "Meadow Podzolic Soils", value: "Meadow Podzolic Soils" },
            { label: "Bog and Half-Bog Soils", value: "Bog and Half-Bog Soils" },
            { label: "Alluvial Soils", value: "Alluvial Soils" },
            { label: "Regosols", value: "Regosols" },
          ]}
          placeholder={{ label: "Select soil condition", value: null }}
          style={pickerSelectStyles}
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
  // header: {
  //   height: 60,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginVertical: 20,
  //   paddingHorizontal: 16,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#ccc",
  // },
  // headerTitle: {
  //   flex: 1,
  //   textAlign: "center",
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  form: {
    marginBottom: 20,
    marginTop: 10,
    padding: 0,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
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
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#607F0E",
    paddingVertical: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});

export default FertilizerForm;
