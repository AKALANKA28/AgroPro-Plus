// FertilizerFormScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import FertilizerForm from '../../components/Forms/FertilizerForm'; // Import the form component

const FertilizerFormScreen = ({ navigation }) => {
  const handleFormSubmit = (formData) => {
    // Handle form submission
    console.log('Form data:', formData);
    // Navigate back to previous screen after submission
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <FertilizerForm onSubmit={handleFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default FertilizerFormScreen;
