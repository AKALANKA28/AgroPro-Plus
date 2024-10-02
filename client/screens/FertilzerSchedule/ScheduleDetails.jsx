import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { ProgressBar } from "react-native-paper"; // Use this for soil condition progress bars
import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome for icons
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ScheduleDetails = ({ route }) => {
  const { schedule, isGenerated } = route.params;
  const navigation = useNavigation(); // Access navigation

  const saveScheduleToDB = async () => {
    const formattedSchedule = {
      ...schedule,
      soil_condition: {
        nitrogen: parseFloat(schedule.soil_condition.nitrogen) || 0,
        pH: parseFloat(schedule.soil_condition.pH) || 0,
      },
    };

    try {
      const response = await axios.post("/schedule/save", {
        schedule: formattedSchedule,
      });

      if (response.status === 200) {
        Alert.alert("Success", "Fertilizer schedule saved successfully!");
      } else {
        Alert.alert("Error", "Failed to save the fertilizer schedule.");
      }
    } catch (error) {
      console.error("Failed to save schedule:", error);
      Alert.alert("Error", "An error occurred while saving the schedule.");
    }
  };

  // Function to get the image path based on crop type
  const getImagePath = (cropType) => {
    switch (cropType) {
      case "Rice":
        return require("../../assets/images/plantImages/rice.png");
      // Add more crop cases here
      default:
        return require("../../assets/images/plantImages/rice.png");
      // Fallback image
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperContainer}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Three-dot Menu Icon */}
        <TouchableOpacity
          onPress={() => Alert.alert("Menu", "Three-dot menu pressed")}
          style={styles.menuIcon}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.headerContainer}>
        {/* Left Section for Image */}
        <View style={styles.imageContainer}>
          <Image
            source={getImagePath(schedule.crop_type)} // Dynamically get image based on crop type
            style={styles.cropImage}
            // resizeMode="contain" // Adjusts how the image fits the container
          />
        </View>

        {/* Right Section for Crop Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.cropTitleContainer}>
            <Text style={styles.subtitle}>Fertilizer Schedule for</Text>
            <Text style={styles.croptitle}>{schedule.crop_type}</Text>
          </View>
          <View style={styles.subDetailsContainer}>
            <Text style={styles.subtitle}>
              Planting Date: {schedule.planting_date}
            </Text>
            <Text style={styles.subtitle}>Area Size: {schedule.area_size}</Text>
            <Text style={styles.subtitle}>Soil Condition:</Text>
            <View style={styles.progressContainer}>
              <Text>Nitrogen: {schedule.soil_condition.nitrogen}</Text>
              <ProgressBar
                progress={schedule.soil_condition.nitrogen / 100}
                color="#00aaff"
                style={styles.progressBar}
              />
            </View>
            <View style={styles.progressContainer}>
              <Text>pH: {schedule.soil_condition.pH}</Text>
              <ProgressBar
                progress={schedule.soil_condition.pH / 14}
                color="#ffbb00"
                style={styles.progressBar}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.animatedContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          {schedule.growth_stages.map((stage, index) => (
            <View key={index} style={styles.stageContainer}>
              <Text style={styles.stageTitle}>Stage: {stage.stage}</Text>
              <Text style={styles.text}>Amount: {stage.amount}</Text>
              <Text style={styles.text}>
                Application Date: {stage.application_date}
              </Text>
              <Text style={styles.text}>
                Fertilizer Type: {stage.fertilizer_type}
              </Text>
              <Text style={styles.text}>Notes: {stage.notes}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Conditionally show the Save button if the schedule is generated */}
      {isGenerated && (
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveScheduleToDB}
          >
            <Text style={styles.saveButtonText}>Save Schedule</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  wrapperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Spread back icon, title, and menu icon
  },
  backButton: {
    position: "absolute",
    top: 40, // Adjust according to your header height
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  menuIcon: {
    position: "absolute",
    top: 40, // Adjust according to your header height
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8, // Reduced padding to decrease height
    paddingTop: 0,
    paddingBottom: 0, // Reduce padding from the bottom
    backgroundColor: "#fff",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    // borderWidth: 1,
  },
  imageContainer: {
    flex: 1,
    paddingRight: 10,
    zIndex: 1,
  },
  cropImage: {
    width: "350%", // Setting width to 200%
    height: 580, // Set a larger height for the image
    resizeMode: "cover", // Cover to maintain aspect ratio
    position: "relative", // To allow for absolute positioning adjustments if needed
    left: "-80%", // Move the image left by 50% of its width to center
    top: "10%", // Move the image up by 50% of its height to center
  },

  detailsContainer: {
    flex: 2,
    paddingLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cropTitleContainer: {
    top: 10, // Align at the top
    right: -90, // Align to the right side with some padding
    zIndex: 0, // Make sure it appears above other content
    backgroundColor: "#fff", // Add a background to make it stand out
    padding: 10, // Add padding for spacing
    borderRadius: 8, // Optional: round the corners
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Add elevation for shadow on Android
  },
  croptitle: {
    fontSize: 40, // Make it larger
    fontWeight: "bold", // Bolder text
    alignSelf: "left", // Align to the top right corner
    marginBottom: 10, // Adjust margin as needed
    textTransform: "uppercase", // Capitalize the text
  },
  subDetailsContainer: {
    marginTop: 100, // Ensure the remaining content does not overlap with the crop title
    paddingLeft: 10,
  },

  subtitle: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
  progressContainer: { marginBottom: 10 },
  progressBar: { height: 10, borderRadius: 5 },

  animatedContainer: {
    position: "absolute", // Set to absolute positioning
    top: 530, // Align to the top of the parent
    left: 0,
    right: 0,
    bottom: 0, // Allow it to stretch down
    backgroundColor: "#f8f8f8", // Background color for visibility
    zIndex: 2, // Ensure it appears above the header
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  stageContainer: {
    marginVertical: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  stageTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  saveButtonContainer: {
    position: "absolute",
    bottom: 20, // Position at the bottom
    width: "100%", // Ensure it stretches across the width
    alignItems: "center", // Center horizontally
  },
  saveButton: {
    backgroundColor: "#183719", // Button background color
    paddingVertical: 20,
    paddingHorizontal: 160,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ScheduleDetails;
