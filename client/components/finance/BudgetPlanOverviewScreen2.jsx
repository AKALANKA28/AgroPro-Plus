import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const screenWidth = Dimensions.get("window").width;

const BudgetPlanOverviewScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [budgetPlan, setBudgetPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBudgetPlan = async () => {
    try {
      const response = await axios.get(`/finance/get2/${id}`);
      setBudgetPlan(response.data.BudgetPlan);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching budget plan details:", error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBudgetPlan();
    }, [id])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!budgetPlan) {
    return (
      <View style={styles.errorContainer}>
        <Text>No budget plan found.</Text>
      </View>
    );
  }

  const handleEdit = () => {
    navigation.navigate("EditBudgetPlanScreen", { id });
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this budget plan?",
      [
        {
          text: "No",
          onPress: () => console.log("Deletion canceled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await axios.delete(`/finance/delete2/${id}`);
              Alert.alert("Success", "Budget plan deleted successfully.", [
                { text: "OK", onPress: () => navigation.navigate("BudgetPlansScreen") },
              ]);
            } catch (error) {
              console.log("Error deleting budget plan:", error);
              Alert.alert("Error", "Failed to delete the budget plan.");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const downloadPdf = async () => {
    try {
      const chartBase64 = await generateChartBase64(); // Generate chart base64 image
  
      const htmlContent = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f7f7f7;
              }
              h1, h2, h3 {
                color: #34A853;
                text-align: center;
              }
              .container {
                padding: 20px;
                background-color: #fff;
                margin: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              }
              .section {
                margin-bottom: 20px;
              }
              .section-header {
                font-size: 20px;
                font-weight: bold;
                color: #34A853;
                margin-bottom: 10px;
              }
              .table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
              }
              .table th, .table td {
                padding: 10px;
                border: 1px solid #ddd;
                text-align: left;
              }
              .table th {
                background-color: #34A853;
                color: #fff;
              }
              .value {
                font-weight: bold;
                color: #555;
              }
              .chart-container {
                text-align: center;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 14px;
                color: #888;
              }
            </style>
          </head>
          <body>
            <h1>Budget Plan Report</h1>
            <h2>${budgetPlan.title}</h2>
  
            <div class="container">
              <!-- Section 1: Overview -->
              <div class="section">
                <h3 class="section-header">Overview</h3>
                <table class="table">
                  <tr>
                    <th>Crop</th>
                    <td>${budgetPlan.crop}</td>
                  </tr>
                  <tr>
                    <th>Climate Zone</th>
                    <td>${budgetPlan.climateZone}</td>
                  </tr>
                  <tr>
                    <th>Area of Land</th>
                    <td>${budgetPlan.areaOfLand} acres</td>
                  </tr>
                </table>
              </div>
  
              <!-- Section 2: Financial Summary -->
              <div class="section">
                <h3 class="section-header">Financial Summary</h3>
                <table class="table">
                  <tr>
                    <th>Total Expenditure</th>
                    <td class="value">Rs.${budgetPlan.totalExpenditure}</td>
                  </tr>
                  <tr>
                    <th>Total Yield</th>
                    <td class="value">${budgetPlan.totalYield} kg</td>
                  </tr>
                  <tr>
                    <th>Estimated Income</th>
                    <td class="value">Rs.${budgetPlan.estimatedIncome}</td>
                  </tr>
                  <tr>
                    <th>Profit</th>
                    <td class="value">Rs.${budgetPlan.profit}</td>
                  </tr>
                </table>
              </div>
  
              <!-- Section 3: Analysis Charts -->
              <div class="section">
                <h3 class="section-header">Analysis</h3>
                <div class="chart-container">
                  <h4>Financial Overview</h4>
                  <img src="${chartBase64}" alt="Financial Overview Chart" />
                </div>
              </div>
  
              <div class="footer">
                <p>Generated by AgroPro Finance Management</p>
              </div>
            </div>
          </body>
        </html>
      `;
  
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });
  
      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
      } else {
        const fileUri = `${FileSystem.documentDirectory}${budgetPlan.title}_report.pdf`;
        await FileSystem.moveAsync({
          from: uri,
          to: fileUri,
        });
        await Sharing.shareAsync(fileUri);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  
  const generateChartBase64 = async () => {
    // Assuming you have a chart image as base64 from react-native-chart-kit
    return `
      data:image/png;base64,
      iVBORw0KGgoAAAANSUhEUgAAA...
    `; // Replace with real chart image in base64 format
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Budget Plan Overview</Text>

      {/* Detail Overview */}
      <View style={styles.detailCard}>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Crop:</Text>
          <Text style={styles.value}>{budgetPlan.crop}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Climate Zone:</Text>
          <Text style={styles.value}>{budgetPlan.climateZone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Area of Land (acres):</Text>
          <Text style={styles.value}>{budgetPlan.areaOfLand}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Total Expenditure:</Text>
          <Text style={styles.value}>Rs.{budgetPlan.totalExpenditure}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Total Yield (kg):</Text>
          <Text style={styles.value}>{budgetPlan.totalYield}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Estimated Income:</Text>
          <Text style={styles.value}>Rs.{budgetPlan.estimatedIncome}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Profit:</Text>
          <Text style={styles.value}>Rs.{budgetPlan.profit}</Text>
        </View>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <FontAwesome name="trash" size={24} color="#FF6347" />
        </TouchableOpacity>
      </View>

      {/* Bar Chart for Financial Overview */}
      <Text style={styles.sectionHeader}>Financial Overview</Text>
      
      <BarChart
        data={{
          labels: ["Total Expenditure", "Estimated Income", "Profit"],
          datasets: [
            {
              data: [
                budgetPlan.totalExpenditure,
                budgetPlan.estimatedIncome,
                budgetPlan.profit,
              ],
              color: (opacity = 1) => `rgba(34, 193, 195, ${opacity})`, // Color of the bars
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel="Rs."
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
      />

      {/* Download PDF Button */}
      <TouchableOpacity onPress={downloadPdf} style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Download PDF Report</Text>
      </TouchableOpacity>

      {/* Edit and Delete Buttons */}
      <View style={styles.iconContainer}>
        {/* <TouchableOpacity onPress={handleEdit}>
          <FontAwesome name="edit" size={24} color="#34A853" />
        </TouchableOpacity> */}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34A853",
    marginBottom: 20,
  },
  detailCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10,
  },
  downloadButton: {
    backgroundColor: "#34A853",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default BudgetPlanOverviewScreen;
