import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ScheduleDetails = ({ route }) => {
  const { schedule } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {schedule ? (
        <View>
          <Text style={styles.title}>Fertilizer Schedule for {schedule.fertilizer_schedule.crop_type}</Text>
          <Text style={styles.subtitle}>Planting Date: {schedule.fertilizer_schedule.planting_date}</Text>
          <Text style={styles.subtitle}>
            Soil Condition: pH {schedule.fertilizer_schedule.soil_condition.pH}, Nitrogen: {schedule.fertilizer_schedule.soil_condition.nitrogen}
          </Text>
          <Text style={styles.subtitle}>Weather Forecast: {schedule.fertilizer_schedule.weather_forecast}</Text>

          {schedule.fertilizer_schedule.growth_stages.length > 0 ? (
            schedule.fertilizer_schedule.growth_stages.map((stage, index) => (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
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
