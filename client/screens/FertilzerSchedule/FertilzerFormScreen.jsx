import React from 'react';
import { View, StyleSheet } from 'react-native';
import FertilizerForm from '../../components/Forms/FertilizerForm'; // Import the form component

const FertilizerFormScreen = ({ navigation }) => {

  const handleFormSubmit = (formData) => {
    console.log('Form data submitted:', formData);
    // Here you would navigate and pass formData to the FertilizerSchedule screen
    navigation.navigate("FertilizerSchedule", { formData });
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
