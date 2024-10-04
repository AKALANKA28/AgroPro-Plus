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
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

const CropSelectionScreen = () => {
  const [budgetPlanName, setBudgetPlanName] = useState(""); // Budget Plan Name
  const [crop, setCrop] = useState(""); // Selected Crop
  const [climateZone, setClimateZone] = useState(""); // Selected Climate Zone
  const [areaOfLand, setAreaOfLand] = useState(""); // Area of cultivation
  const [fertilizerCost, setFertilizerCost] = useState(""); // Fertilizer cost
  const [startDate, setStartDate] = useState(new Date()); // Start date
  const [endDate, setEndDate] = useState(new Date()); // End date
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [totalExpenditure, setTotalExpenditure] = useState(0); // Total expenditure
  const [totalYield, setTotalYield] = useState(0); // Total yield
  const [estimatedIncome, setEstimatedIncome] = useState(0); // Estimated income
  const [profit, setProfit] = useState(0); // Profit
  const [loading, setLoading] = useState(false);

  // Hardcoded crop details
  const cropDetails = {
    paddy: {
      zones: {
        'Dry & Intermediate Zone (Rainfed)': {
          yieldPerAcre: 800,
          marketPricePerKg: 450,
          expenditures: {
            seedsCost: 2000,
            pesticidesCost: 1500,
            laborCost: 1200,
            waterCost: 300,
          },
        },
        'Wet Zone': {
          yieldPerAcre: 1000,
          marketPricePerKg: 500,
          expenditures: {
            seedsCost: 2500,
            pesticidesCost: 2000,
            laborCost: 1300,
            waterCost: 400,
          },
        },
      },
    },
    tea: {
      zones: {
        'Dry & Intermediate Zone (Irrigated)': {
          yieldPerAcre: 600,
          marketPricePerKg: 800,
          expenditures: {
            seedsCost: 1500,
            pesticidesCost: 1000,
            laborCost: 1100,
            waterCost: 200,
          },
        },
        'Wet Zone': {
          yieldPerAcre: 700,
          marketPricePerKg: 850,
          expenditures: {
            seedsCost: 1800,
            pesticidesCost: 1200,
            laborCost: 1150,
            waterCost: 250,
          },
        },
      },
    },
  };

  const [zones, setZones] = useState([]); // To store relevant zones

  // Function to update zones based on selected crop
  const updateZones = (selectedCrop) => {
    if (cropDetails[selectedCrop]) {
      setZones(Object.keys(cropDetails[selectedCrop].zones));
    } else {
      setZones([]);
    }
  };

  // Function to get details for the selected crop and zone
  const getCropDetails = () => {
    if (crop && climateZone) {
      return cropDetails[crop].zones[climateZone] || null;
    }
    return null;
  };

  // Function to handle start date change
  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  // Function to handle end date change
  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  // Function to calculate total expenditure, yield, income, and profit
  const calculateEstimates = () => {
    const cropInfo = getCropDetails();
    if (cropInfo && areaOfLand) {
      const area = parseFloat(areaOfLand);
      const yieldEstimate = cropInfo.yieldPerAcre * area;
      const revenueEstimate = yieldEstimate * cropInfo.marketPricePerKg;

      const seedsCostTotal = cropInfo.expenditures.seedsCost * area;
      const pesticidesCostTotal = cropInfo.expenditures.pesticidesCost * area;
      const laborCostTotal = cropInfo.expenditures.laborCost * area;
      const waterCostTotal = cropInfo.expenditures.waterCost * area;
      const totalExpenditure = seedsCostTotal + pesticidesCostTotal + laborCostTotal + waterCostTotal + parseFloat(fertilizerCost);

      setTotalYield(yieldEstimate);
      setEstimatedIncome(revenueEstimate);
      setProfit(revenueEstimate - totalExpenditure);
      setTotalExpenditure(totalExpenditure);
    } else {
      Alert.alert('Error', 'Please ensure all fields are filled correctly.');
    }
  };

  // Function to save the budget plan to the database
  const handleSaveBudgetPlan = async () => {
    // Validate input data
    if (!budgetPlanName) {
      Alert.alert('Error', 'Please enter a budget plan name.');
      return;
    }
  
    if (!crop) {
      Alert.alert('Error', 'Please select a crop.');
      return;
    }
  
    if (!climateZone) {
      Alert.alert('Error', 'Please select a climate zone.');
      return;
    }
  
    if (!areaOfLand || isNaN(parseFloat(areaOfLand))) {
      Alert.alert('Error', 'Please enter a valid area of land in acres.');
      return;
    }
  
    if (!fertilizerCost || isNaN(parseFloat(fertilizerCost))) {
      Alert.alert('Error', 'Please enter a valid fertilizer cost.');
      return;
    }
  
    if (totalExpenditure === 0) {
      Alert.alert('Error', 'Total expenditure must be calculated before saving.');
      return;
    }
  
    // Prepare the budget plan object
    const budgetPlan = {
      title: budgetPlanName,
      startDate,
      endDate,
      seedsCost: 0,
      pesticidesCost:  0,
      otherCost:  0,
      estimatedYield: 0,
      estimatedRevenue: 0,
      crop,
      climateZone,
      areaOfLand,
      fertilizerCost,
      totalExpenditure,
      totalYield,
      estimatedIncome,
      profit,
    };
  
    try {
      console.log(budgetPlan);
      setLoading(true); // Show loading indicator while saving
      const response = await axios.post(`/finance/add`, budgetPlan); // Replace with your API URL
      Alert.alert('Success', 'Budget plan saved successfully!');
     // navigation.navigate("BudgetPlansScreen"); // Navigate back after saving
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save the budget plan.');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Crop Selection</Text>

      <Text>Budget Plan Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Budget Plan Name"
        value={budgetPlanName}
        onChangeText={setBudgetPlanName}
      />

      <Text>Start Date</Text>
      <TouchableOpacity style={styles.datePicker} onPress={() => setShowStartDatePicker(true)}>
        <Text>{startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker value={startDate} mode="date" display="default" onChange={handleStartDateChange} />
      )}

      <Text>End Date</Text>
      <TouchableOpacity style={styles.datePicker} onPress={() => setShowEndDatePicker(true)}>
        <Text>{endDate.toDateString()}</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker value={endDate} mode="date" display="default" onChange={handleEndDateChange} />
      )}

      <Text>Select Crop</Text>
      <Picker
        selectedValue={crop}
        onValueChange={(itemValue) => {
          setCrop(itemValue);
          setClimateZone(''); // Reset climate zone
          updateZones(itemValue); // Update zones based on selected crop
        }}
      >
        <Picker.Item label="Select a Crop" value="" />
        <Picker.Item label="Paddy" value="paddy" />
        <Picker.Item label="Tea" value="tea" />
      </Picker>

      <Text>Select Climatic Zone</Text>
      <Picker
        selectedValue={climateZone}
        onValueChange={(itemValue) => setClimateZone(itemValue)}
      >
        <Picker.Item label="Select a Climate Zone" value="" />
        {zones.map((zone, index) => (
          <Picker.Item key={index} label={zone} value={zone} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Area of Land (in acres)"
        value={areaOfLand}
        onChangeText={setAreaOfLand}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Fertilizer Cost"
        value={fertilizerCost}
        onChangeText={setFertilizerCost}
        keyboardType="numeric"
      />

      <Button title="Calculate Estimates" onPress={calculateEstimates} />

      {/* Display calculation results */}
      <View>
        <Text>Total Expenditure: Rs. {totalExpenditure}</Text>
        <Text>Total Yield: {totalYield} kg</Text>
        <Text>Estimated Income: Rs. {estimatedIncome}</Text>
        <Text>Profit: Rs. {profit}</Text>
      </View>

      <Button title="Save Budget Plan" onPress={handleSaveBudgetPlan} />
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  datePicker: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
});

export default CropSelectionScreen;
