import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const FertilizerForm = ({ onSubmit }) => {
  const [cropType, setCropType] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [soilCondition, setSoilCondition] = useState('');
  const [weatherForecast, setWeatherForecast] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (cropType && plantingDate && soilCondition && weatherForecast) {
      onSubmit({
        cropType,
        plantingDate,
        soilCondition,
        weatherForecast
      });
      setError(null);
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Crop Type:</Text>
      <TextInput
        style={styles.input}
        value={cropType}
        onChangeText={setCropType}
        placeholder="Enter crop type"
      />
      <Text style={styles.label}>Planting Date:</Text>
      <TextInput
        style={styles.input}
        value={plantingDate}
        onChangeText={setPlantingDate}
        placeholder="Enter planting date (YYYY-MM-DD)"
      />
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
      <Button title="Fetch Schedule" onPress={handleSubmit} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default FertilizerForm;
