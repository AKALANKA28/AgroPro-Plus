import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';

const fertilizerAPI = axios.create({
  baseURL: 'http://192.168.1.159:8000', // FastAPI backend URL
  timeout: 50000, // Adjust the timeout if needed
});

const FertilizerSchedule = () => {
  // Hardcoded data
  const cropType = 'rice';
  const plantingDate = '2023-09-01';
  const soilCondition =  "pH: 6.8, nitrogen: 'low'" ;
  const weatherForecast = 'low rainfall';

  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFertilizerSchedule = async () => {
    setLoading(true);
    try {
      const response = await fertilizerAPI.post('/generate_schedule', {
        crop_type: cropType,
        planting_date: plantingDate,
        soil_condition: soilCondition,
        weather_forecast: weatherForecast,
      });
      console.log('Response data:', response.data); // Log the response data
      if (response.data && response.data.schedule) {
        setSchedule(response.data.schedule); // Set the whole response data
      } else {
        setError('No schedule data received');
      }
    } catch (err) {
      console.error('Error details:', err.response ? err.response.data : err.message);
      setError('Failed to fetch the fertilizer schedule');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFertilizerSchedule().finally(() => setRefreshing(false));
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchFertilizerSchedule();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#006400" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
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
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FertilizerSchedule;
