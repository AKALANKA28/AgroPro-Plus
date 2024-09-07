import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ScheduleDetails = ({ route }) => {
  const { schedule } = route.params;
  const navigation = useNavigation(); // Get navigation object to go back

  // Destructure properties with fallback values to avoid undefined errors
  const { fertilizer_schedule = {} } = schedule || {};
  const {
    crop_type = 'N/A',
    planting_date = 'N/A',
    soil_condition = { pH: 'N/A', nitrogen: 'N/A' },
    weather_forecast = 'N/A',
    growth_stages = []
  } = fertilizer_schedule;

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

      <ScrollView contentContainerStyle={styles.container}>
        {schedule ? (
          <View>
            <Text style={styles.title}>
              Fertilizer Schedule for {crop_type}
            </Text>
            <Text style={styles.subtitle}>
              Planting Date: {planting_date}
            </Text>
            <Text style={styles.subtitle}>
              Soil Condition: pH {soil_condition.pH}, Nitrogen: {soil_condition.nitrogen}
            </Text>
            <Text style={styles.subtitle}>
              Weather Forecast: {weather_forecast}
            </Text>

            {growth_stages.length > 0 ? (
              growth_stages.map((stage, index) => (
                <View key={index} style={styles.stage}>
                  <Text style={styles.stageTitle}>Stage: {stage.stage}</Text>
                  <Text>Application Date: {stage.application_date}</Text>
                  <Text>Fertilizer Type: {stage.fertilizer_type}</Text>
                  <Text>Amount: {stage.amount}</Text>
                  <Text>Notes: {stage.notes}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No growth stages available</Text>
            )}
          </View>
        ) : (
          <Text style={styles.emptyText}>No fertilizer schedule available</Text>
        )}
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 0.5, // Adds a subtle shadow
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  stage: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  stageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ScheduleDetails;
