import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios"; // Make sure to install axios if you haven't already

const CropCard = () => {
  const [cropData, setCropData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/schedule/"); // Replace with your actual API URL
        // console.log(response.data); // Log the response data
  
        // Check if the response data is an array
        if (Array.isArray(response.data)) {
          const today = new Date();
          const nextStages = response.data.map(crop => {
            const nextStage = crop.growth_stages.find(stage => 
              new Date(stage.application_date) > today
            );
  
            // If there's a next stage, return the crop type and next stage info
            if (nextStage) {
              return {
                crop_type: crop.crop_type,
                ...nextStage
              };
            }
            return null; // Return null if no next stage is found
          }).filter(stage => stage !== null); // Filter out null values
  
          // Set the next stages data
          setCropData(nextStages);
        } else {
          console.error("Schedule data is undefined or incorrectly structured.");
          setCropData([]); // Optionally set to an empty state or show a message
        }
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  // Render each crop card dynamically
 // Render each crop card dynamically
const renderCrop = ({ item }) => {
  // Calculate days until the application date
  const today = new Date();
  const applicationDate = new Date(item.application_date);
  const timeDiff = applicationDate - today; // Difference in milliseconds
  const daysUntilApplication = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert to days

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: "your-image-uri-here" }} style={styles.cropImage} />
        <Text style={styles.imageText}>
          In {daysUntilApplication} day{daysUntilApplication !== 1 ? 's' : ''}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Crop Type: {item.crop_type}</Text>
        <Text style={styles.infoText}>Stage: {item.stage}</Text>
        <Text style={styles.infoText}>
          Fertilizer Type: <Text style={styles.typeContent}>{item.fertilizer_type}</Text>
        </Text>
        <Text style={styles.infoText}>
          Amount: {item.amount}
        </Text>
        <Text style={styles.infoText}>
          Notes: {item.notes}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={cropData}
      renderItem={renderCrop}
      keyExtractor={(item) => item.application_date} // Use application_date as the key
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
  typeContent: {
    color: "#607F0E",
  },
});

export default CropCard;
