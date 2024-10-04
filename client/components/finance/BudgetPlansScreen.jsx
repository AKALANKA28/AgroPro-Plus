import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import {BASE_URL} from '../../constants/constants';

const BudgetPlansScreen = ({ navigation }) => {
  const [budgetPlans, setBudgetPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  console.log("API Base URL:", BASE_URL);

  const fetchBudgetPlans = async () => {
    try {
      const response = await axios.get(`/finance/`);
      setBudgetPlans(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong while fetching the data");
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);  // Show loader while fetching data
      fetchBudgetPlans(); // Fetch data when the screen is focused
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Budget Plan Overview", { id: item._id })}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDetails}>
        Budget Period: {new Date(item.startDate).toISOString().split("T")[0]} To{" "}
        {new Date(item.endDate).toISOString().split("T")[0]}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Budget Plans</Text>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Budget Plans"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButtonActive}>
          <Text style={styles.filterTextActive}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButtonInactive}>
          <Text style={styles.filterTextInactive}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButtonInactive} onPress={() => navigation.navigate("MarketPriceTable")}>
          <Text style={styles.filterTextInactive}>Finished</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.recentText}>Recent</Text>
      <FlatList
        data={budgetPlans}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddBudgetPlan")}>
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  searchSection: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    padding: 10,
    paddingLeft: 40,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  filterButtonActive: {
    backgroundColor: "#34A853",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  filterButtonInactive: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  filterTextActive: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  filterTextInactive: {
    fontSize: 14,
    color: "#000000",
  },
  recentText: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 16,
    color: "#000",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#34A853",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  cardDetails: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: '#34A853',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
});

export default BudgetPlansScreen;
