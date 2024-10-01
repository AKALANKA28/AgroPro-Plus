// CropCard.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CropCard = ({ imageUri, health, week, alerts = [], crop_type }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.cropImage} />
        <Text style={styles.imageText}>In 5 days</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Crop Type: {crop_type}</Text>
        <Text style={styles.infoText}>Week: {week}</Text>
        <View style={styles.fertilizerType}>
          <Text style={styles.typeText}>
            Fertilizer Type:
            <Text style={styles.typeContent}> Urea</Text>
          </Text>
          <Text style={styles.typeText}>
            Fertilizer Amount:
            <Text style={styles.typeContent}> 50 kg/ha</Text>
          </Text>
        </View>
      </View>

      <View style={styles.alertContainer}>
        <Text style={styles.sectionTitle}>Alerts</Text>
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <Text key={index} style={styles.alertText}>
              {alert}
            </Text>
          ))
        ) : (
          <Text style={styles.alertText}>No alerts</Text>
        )}
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
  imageContainer: {
    position: "relative", // Ensures that the child elements can be positioned absolutely
  },
  cropImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageText: {
    position: "absolute", // Positioning the text absolutely within the parent container
    top: 10, // Distance from the top of the image
    left: 250, // You can adjust this based on where you want the text
    color: "#fff", // Color of the text
    fontSize: 16,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Optional background for better text readability
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 5,
  },
  infoContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#8BC34A",
    textAlign: "center", // Horizontally center the text
    height: 35, // Set a fixed height for the Text component
    lineHeight: 30, // Make lineHeight equal to height to center the text vertically
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  infoContent: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
  },
  typeText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
  },
  typeContent: {
    fontSize: 19,
    color: "#333",
    fontWeight: "bold",
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
  fertilzerType: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
  },
});

export default CropCard;
