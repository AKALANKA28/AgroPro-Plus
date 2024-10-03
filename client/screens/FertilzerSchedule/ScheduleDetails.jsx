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
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import imageMapping from "../../components/Home/ImageData"; // Adjust the path as necessary

const getImageUri = (crop_type, stage) => {
  if (imageMapping[crop_type] && imageMapping[crop_type][stage]) {
    return imageMapping[crop_type][stage];
  }
  return null; // Return null if no matching image is found
};

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
      navigation.navigate("FertilizerSchedule");
    } catch (error) {
      console.error("Failed to save schedule:", error);
      Alert.alert("Error", "An error occurred while saving the schedule.");
    }
  };

  const getImagePath = (cropType) => {
    switch (cropType) {
      case "Rice":
        return require("../../assets/images/plantImages/rice.png");
      default:
        return require("../../assets/images/plantImages/rice.png");
    }
  };

  const imageUri = getImageUri(schedule.crop_type, schedule.stage); // Refer to schedule directly

  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Alert.alert("Menu", "Three-dot menu pressed")}
          style={styles.menuIcon}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={getImagePath(schedule.crop_type)}
            style={styles.cropImage}
          />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.cropTitleContainer}>
            <Text style={styles.subtitle}>Fertilizer Schedule for</Text>
            <Text style={styles.croptitle}>{schedule.crop_type}</Text>
          </View>
          <View style={styles.subDetailsContainer}>
            <Text style={styles.subtitle}>
              Planting Date: {schedule.planting_date}
            </Text>
            <Text style={styles.subtitle}>
              Est. Cost: Rs. {schedule.estimated_total_cost}
            </Text>
            <Text style={styles.subtitle}>
              Est. Harvesting Date: {schedule.estimated_harvesting_date}
            </Text>

            <Text style={styles.subtitle}>Area Size: {schedule.area_size}</Text>
            <Text style={styles.subtitle}>Soil Condition:</Text>
            <Text>Nitrogen: {schedule.soil_condition.nitrogen}</Text>
            <Text>pH: {schedule.soil_condition.pH}</Text>
          </View>
        </View>
      </View> */}

      <View style={styles.animatedContainer}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {schedule.growth_stages.map((stage, index) => {
            const imageSource = getImageUri(schedule.crop_type, stage.stage);

            return (
              <View key={index} style={styles.stageContainer}>
                <View style={styles.rowContainer}>
                  <View style={styles.imageContainer}>
                    {imageSource ? (
                      <Image source={imageSource} style={styles.stageImage} />
                    ) : (
                      <Text style={styles.noImageText}>No Image Available</Text>
                    )}
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.stageTitle}>Stage: {stage.stage}</Text>
                    <Text style={styles.text}>Amount: {stage.amount}</Text>
                    <Text style={styles.text}>
                      Application Date: {stage.application_date}
                    </Text>
                    <Text style={styles.text}>
                      Fertilizer Type: {stage.fertilizer_type}
                    </Text>
                    <Text style={styles.text}>Notes: {stage.notes}</Text>
                    <Text style={styles.text}>Cost: Rs. {stage.cost}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveScheduleToDB}>
          <Text style={styles.saveButtonText}>Save Schedule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Keep the same styles but ensure there are no duplicates
  wrapper: { flex: 1 },
  wrapperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  menuIcon: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  imageContainer: { flex: 1, paddingRight: 10, zIndex: 1 },
  // cropImage: {
  //   width: "350%",
  //   height: 580,
  //   resizeMode: "cover",
  //   left: "-80%",
  //   top: "10%",
  // },
  // detailsContainer: { flex: 2, paddingLeft: 10 },
  // cropTitleContainer: {
  //   top: 10,
  //   right: -40,
  //   zIndex: 0,
  //   backgroundColor: "#fff",
  //   padding: 10,
  //   borderRadius: 8,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  // croptitle: {
  //   fontSize: 40,
  //   alignSelf: "left",
  //   fontFamily: "poppins-bold",
  //   textTransform: "capitalize",
  // },
  // subDetailsContainer: { marginTop: 100, paddingLeft: 10 },
  // subtitle: {
  //   fontSize: 18,
  //   marginTop: 8,
  //   fontFamily: "poppins",
  //   marginBottom: -8,
  // },
  animatedContainer: {
    // position: "absolute",
    // top: 530,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // backgroundColor: "#f8f8f8",
    // zIndex: 2,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,

    padding: 16,

  },
  container: { flexGrow: 1, paddingBottom: 80 },
  stageContainer: {
    marginVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    justifyContent: "center", // Center vertically
    padding: 14,
    paddingLeft: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,

  },
  stageImage: {
    width: "100%",
    height: 200,
    minHeight: 210,
    resizeMode: "cover",
    borderRadius: 16,
    // borderTopRightRadius: 0,
    // borderBottomRightRadius: 0,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: { flex: 2,},
  stageTitle: { fontSize: 18, fontWeight: "bold" },
  text: { fontSize: 16, marginVertical: 4 },

  saveButtonContainer: {
    position: "absolute",
    bottom: 20, // Position at the bottom
    width: "100%", // Ensure it stretches across the width
    alignItems: "center", // Center horizontally
    zIndex: 3,
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
