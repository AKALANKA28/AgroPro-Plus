import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import cropData from "./cropData"; // Adjust the path according to your folder structure

const CropCard = () => {
  // Render each crop card dynamically
  const renderCrop = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUri }} style={styles.cropImage} />
        <Text style={styles.imageText}>In 5 days</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Crop Type: {item.crop_type}</Text>
        <Text style={styles.infoText}>Week: {item.week}</Text>
        <View style={styles.fertilizerType}>
          <Text style={styles.typeText}>
            Fertilizer Type: <Text style={styles.typeContent}>{item.fertilizerType}</Text>
          </Text>
        </View>
        {item.alerts.length > 0 && (
          <View>
            <Text style={styles.alertText}>Alerts:</Text>
            {item.alerts.map((alert, index) => (
              <Text key={index} style={styles.alertText}>
                {alert}
              </Text>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={cropData} // Using the cropData here
      renderItem={renderCrop}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: "hidden",
    width: 270,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,

  },
  imageContainer: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: "hidden",
  },
  cropImage: {
    width: "100%",
    height: "100%",
  },
  imageText: {
    position: "absolute",
    bottom: 5,
    left: 5,
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
  },
  infoContainer: {
    padding: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
  },
  fertilizerType: {
    marginTop: 8,
  },
  typeText: {
    fontWeight: "bold",
  },
  typeContent: {
    color: "#607F0E",
  },
  alertText: {
    color: "#FF9800",
    marginTop: 5,
  },
});

export default CropCard;
