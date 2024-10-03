import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

// Import the images (or require them dynamically)
const cropImages = {
  rice: require("../assets/images/plantImages/rice.jpeg"),
  corn: require("../assets/images/plantImages/corn.jpeg"),
  soybeans: require("../assets/images/plantImages/rice.jpeg"),
  cotton: require("../assets/images/plantImages/rice.jpeg"),
};

const ScheduleCard = ({
  crop_type, // Use crop_type to display image based on this
  health,
  week,
  alerts = [],
  onPress,
  onDelete, // Function to handle delete
}) => {
  // Swipeable renderRightActions to display the delete button
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.8],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={onDelete}>
        <Animated.View style={[styles.deleteButton, { transform: [{ scale }] }]}>
          <Text style={styles.deleteText}>Delete</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  // Use the crop_type to dynamically choose the image
  const cropImage = cropImages[crop_type] || require("../assets/images/plantImages/rice.jpeg");

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity onPress={onPress} style={styles.card}>
        {/* Left side: Image */}
        <View style={styles.imageContainer}>
          <Image source={cropImage} style={styles.cropImage} />
        </View>

        {/* Right side: Text information */}
        <View style={styles.infoContainer}>
          {/* Crop Type */}
          <Text style={styles.cropTypeText}>{crop_type}</Text>

          {/* Week and other details */}
          <Text style={styles.detailText}>Week: {week}</Text>

          {/* Fertilizer Information */}
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
    // padding: 10,


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
    alignItems: "center",
    width: 100,
    height: "100%",
    borderRadius: 10,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ScheduleCard;
