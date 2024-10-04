import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the delete icon

const cropImages = {
  rice: require("../../assets/images/plantImages/rice.jpeg"),
  corn: require("../../assets/images/plantImages/corn.jpeg"),
  soybeans: require("../../assets/images/plantImages/soybean.jpeg"),
  watermelon: require("../../assets/images/plantImages/watermelon.jpeg"),
};

const ScheduleCard = ({
  crop_type,
  health,
  week,
  alerts = [],
  onPress,
  onDelete,
}) => {
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.8],
      extrapolate: "clamp",
    });

    return (
      <Animated.View style={[styles.deleteButton, { transform: [{ scale }] }]}>
        <TouchableOpacity onPress={onDelete} style={styles.deleteInnerContainer}>
          <Ionicons name="trash-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const cropImage = cropImages[crop_type] || require("../../assets/images/plantImages/rice.jpeg");

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={cropImage} style={styles.cropImage} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.cropTypeText}>{crop_type}</Text>
          <Text style={styles.detailText}>Week: {week}</Text>
          <View style={styles.fertilizerInfo}>
            <Text style={styles.detailText}>
              Est. Harverting Date: <Text style={styles.detailValue}>25 Jan 03</Text>
            </Text>
            <Text style={styles.detailText}>
              Est. Total Cost: <Text style={styles.detailValue}>Rs. 100000.00</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: 390,
  },
  imageContainer: {
    width: 110,
    height: 117,
    marginRight: 10,
    alignItems: "center",
  },
  cropImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingBottom: 10,
  },
  cropTypeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textTransform: "capitalize",
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  detailValue: {
    fontWeight: "bold",
    color: "#333",
  },
  fertilizerInfo: {
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "#ff5e5e",
    justifyContent: "center",
    alignItems: "flex-end",
    width: 100,
    height: 117, // Match the height of the card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  deleteInnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default ScheduleCard;
