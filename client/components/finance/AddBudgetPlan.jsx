import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import {BASE_URL} from '../../constants/constants';

const AddBudgetPlan = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [crop, setCrop] = useState(""); // Dropdown selection for crop
  const [area, setArea] = useState(""); // Area of cultivation input
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [seedsCost, setSeedsCost] = useState("");
  const [fertilizerCost, setFertilizerCost] = useState("");
  const [pesticidesCost, setPesticidesCost] = useState("");
  const [otherCost, setOtherCost] = useState("");
  const [estimatedYield, setEstimatedYield] = useState(""); // For calculated yield
  const [estimatedRevenue, setEstimatedRevenue] = useState(""); // For calculated revenue

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Market prices (hardcoded for now)
  const marketPrices = {
    rice: 500, // price per unit
    tea: 800,
    rubber: 600,
    coconut: 700,
  };

  // Yield per acre for each crop type (assumed values)
  const yieldPerAcre = {
    rice: 1000, // yield per acre
    tea: 600,
    rubber: 300,
    coconut: 500,
  };

  // Function to calculate estimated yield and revenue
  const calculateEstimates = (selectedCrop, cultivationArea) => {
    if (!cultivationArea || !selectedCrop || !yieldPerAcre[selectedCrop]) {
      setEstimatedYield("");
      setEstimatedRevenue("");
      return;
    }

    const yieldEstimate = yieldPerAcre[selectedCrop] * parseFloat(cultivationArea); // Calculate estimated yield
    const revenueEstimate = yieldEstimate * marketPrices[selectedCrop]; // Calculate estimated revenue

    setEstimatedYield(yieldEstimate);
    setEstimatedRevenue(revenueEstimate);
  };

  // Trigger calculations when crop type or area changes
  useEffect(() => {
    calculateEstimates(crop, area);
  }, [crop, area]);

  const handleAddPlan = async () => {
    if (
      !title ||
      !crop ||
      !area ||
      !seedsCost ||
      !fertilizerCost ||
      !pesticidesCost ||
      !otherCost ||
      !estimatedYield ||
      !estimatedRevenue
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const newPlan = {
        title,
        crop,
        area,
        startDate,
        endDate,
        seedsCost,
        fertilizerCost,
        pesticidesCost,
        otherCost,
        estimatedYield,
        estimatedRevenue,
        // aseedsCost: 0,
        // afertilizerCost: 0,
        // apesticidesCost: 0,
        // aotherCost: 0,
        // actualYield: 0,
        // actualRevenue: 0
      };

      const response = await axios.post(
        `/finance/add`,
        newPlan
      );
      Alert.alert("Success", "Budget Plan Added Successfully");
      navigation.navigate("BudgetPlansScreen"); // Navigate back to budget plans list after adding
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Budget Plan</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter Title"
          placeholderTextColor="#888"
        />
      </View>

      {/* Dropdown for crop selection */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Crop</Text>
        <Picker
          selectedValue={crop}
          onValueChange={(itemValue, itemIndex) => setCrop(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select a Crop" value="" />
          <Picker.Item label="Rice" value="rice" />
          <Picker.Item label="Tea" value="tea" />
          <Picker.Item label="Rubber" value="rubber" />
          <Picker.Item label="Coconut" value="coconut" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Area of Cultivation (in acres)</Text>
        <TextInput
          style={styles.input}
          value={area}
          onChangeText={setArea}
          placeholder="Enter Area"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Start Date</Text>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowStartDatePicker(true)}
        >
          <Text style={styles.dateText}>{startDate.toDateString()}</Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onStartDateChange}
          />
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>End Date</Text>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowEndDatePicker(true)}
        >
          <Text style={styles.dateText}>{endDate.toDateString()}</Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onEndDateChange}
          />
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Seeds Cost</Text>
        <TextInput
          style={styles.input}
          value={seedsCost}
          onChangeText={setSeedsCost}
          placeholder="Enter Seeds Cost"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Fertilizer Cost</Text>
        <TextInput
          style={styles.input}
          value={fertilizerCost}
          onChangeText={setFertilizerCost}
          placeholder="Enter Fertilizer Cost"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Pesticides Cost</Text>
        <TextInput
          style={styles.input}
          value={pesticidesCost}
          onChangeText={setPesticidesCost}
          placeholder="Enter Pesticides Cost"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Other Cost</Text>
        <TextInput
          style={styles.input}
          value={otherCost}
          onChangeText={setOtherCost}
          placeholder="Enter Other Cost"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Estimated Yield: {estimatedYield ? `${estimatedYield} units` : "N/A"}</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Estimated Revenue: {estimatedRevenue ? `Rs. ${estimatedRevenue}` : "N/A"}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddPlan}>
        <Text style={styles.buttonText}>Add Budget Plan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#419F57",
    marginBottom: 30,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
  },
  datePicker: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#419F57",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
});

export default AddBudgetPlan;
