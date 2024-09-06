// CropCard.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CropCard = ({ imageUri, health, week, alerts }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.cropImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Health: {health}%</Text>
        <Text style={styles.infoText}>Week: {week}</Text>
      </View>

      <View style={styles.alertContainer}>
        <Text style={styles.sectionTitle}>Alerts</Text>
        {alerts.map((alert, index) => (
          <Text key={index} style={styles.alertText}>
            {alert}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 4,

    marginTop: 10,
    marginBottom: 40,
    marginRight: 15,
    width: 350,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cropImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },

  alertContainer: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  alertText: {
    fontSize: 16,
    color: "#ff5e5e",
    marginBottom: 5,
  },
});

export default CropCard;
