import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Weather from "../components/Weather";
import CropCard from "../components/Cards";
import cropData from "../components/cropData"; // Adjust the path according to your folder structure
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";


const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Home = () => {
  const navigation = useNavigation(); // Get the navigation object

  const pan = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isExpanded, setIsExpanded] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0 && isExpanded && scrollY._value === 0) {
          pan.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > SCREEN_HEIGHT / 4) {
          // Collapse the content section
          setIsExpanded(false);
          Animated.timing(pan, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        } else {
          // Snap back to expanded position
          Animated.spring(pan, {
            toValue: SCREEN_HEIGHT - 50,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const weatherSectionHeight = pan.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 50],
    outputRange: [SCREEN_HEIGHT / 2.5, 0],
    extrapolate: "clamp",
  });

  const contentSectionHeight = pan.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 50],
    outputRange: [SCREEN_HEIGHT / 1.5, SCREEN_HEIGHT],
    extrapolate: "clamp",
  });

  const handleScroll = (e) => {
    const yOffset = e.nativeEvent.contentOffset.y;

    // Expand on downward scroll at the bottom
    if (yOffset > 0 && !isExpanded) {
      setIsExpanded(true);
      Animated.timing(pan, {
        toValue: SCREEN_HEIGHT - 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    // Collapse on upward scroll at the top
    scrollY.setValue(yOffset);
    if (yOffset <= 0 && e.nativeEvent.velocity.y < 0) {
      setIsExpanded(false);
      Animated.timing(pan, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleScrollEndDrag = (e) => {
    const yOffset = e.nativeEvent.contentOffset.y;
    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
    const contentHeight = e.nativeEvent.contentSize.height;

    // Collapse at the top
    if (yOffset <= 0 && e.nativeEvent.velocity.y < 0) {
      setIsExpanded(false);
      Animated.timing(pan, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    // Expand at the bottom
    if (
      yOffset + scrollViewHeight >= contentHeight &&
      e.nativeEvent.velocity.y > 0
    ) {
      setIsExpanded(true);
      Animated.timing(pan, {
        toValue: SCREEN_HEIGHT - 50,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.weatherSection, { height: weatherSectionHeight }]}
      >
        {/* <View style={styles.topView}>
          <View>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.userName}>Akalanka Dias</Text>
          </View>

         <View>
          <TouchableOpacity>
          <Image
            style={styles.userImage}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/4140/4140061.png",
            }}
          />
          </TouchableOpacity>
         
          </View>
        </View> */}
        <Weather />
      </Animated.View>

      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.draggableSection, { height: contentSectionHeight }]}
      >
        <View style={styles.dragIndicator} />
        <View style={styles.topView}>
          <View>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.userName}>Akalanka Dias</Text>
          </View>

          {/* <View>
          <TouchableOpacity>
          <Image
            style={styles.userImage}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/4140/4140061.png",
            }}
          />
          </TouchableOpacity>
         
          </View> */}
        </View>

        <View style={styles.cropButtons}>
          <View style={styles.cropButtonContainer}>
            <TouchableOpacity style={styles.cropButton}
            onPress={() => navigation.navigate('FertilizerSchedule')}
            >
              <EvilIcons name="calendar" size={50} color="#006400" />
            </TouchableOpacity>
            <Text style={styles.cropButtonText}>Fertilizer Schedule</Text>
          </View>
        
          <View style={styles.cropButtonContainer}>
            <TouchableOpacity style={styles.cropButton}>
              <EvilIcons name="camera" size={50} color="#006400" />
            </TouchableOpacity>
            <Text style={styles.cropButtonText}>Camera</Text>
          </View>
          <View style={styles.cropButtonContainer}>
            <TouchableOpacity style={styles.cropButton}>
              <EvilIcons name="chart" size={50} color="#006400" />
            </TouchableOpacity>
            <Text style={styles.cropButtonText}>Finance</Text>
          </View>
          <View style={styles.cropButtonContainer}>
            <TouchableOpacity style={styles.cropButton}>
              <EvilIcons name="location" size={50} color="#006400" />
            </TouchableOpacity>
            <Text style={styles.cropButtonText}>Distributors</Text>
          </View>
          
         
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          onScroll={handleScroll}
          onScrollEndDrag={handleScrollEndDrag}
          scrollEventThrottle={16}
        >
          <Text style={styles.sectionTitle}>Crop Information</Text>

          <FlatList
            data={cropData}
            renderItem={({ item }) => (
              <CropCard
                imageUri={item.imageUri}
                health={item.health}
                week={item.week}
                alerts={item.alerts}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />

          <Text style={styles.sectionTitle}>Crop Information</Text>
          <Image source={{ uri: "crop_image_url" }} style={styles.cropImage} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Health: 20%</Text>
            <Text style={styles.infoText}>Week: 4</Text>
          </View>
          <Text style={styles.sectionTitle}>Alerts</Text>
          <Text style={styles.alertText}>Possible pest attack</Text>
          <Text style={styles.alertText}>Possible water logging</Text>

          <Text style={styles.sectionTitle}>Crop Information</Text>
          <Image source={{ uri: "crop_image_url" }} style={styles.cropImage} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Health: 20%</Text>
            <Text style={styles.infoText}>Week: 4</Text>
          </View>
          <Text style={styles.sectionTitle}>Alerts</Text>
          <Text style={styles.alertText}>Possible pest attack</Text>
          <Text style={styles.alertText}>Possible water logging</Text>

          {/* Additional content */}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEEB",
  },
  weatherSection: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  draggableSection: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  dragIndicator: {
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 2.5,
    alignSelf: "center",
    marginVertical: 10,
  },
  welcome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cropButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cropButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  cropButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  cropButtonText: {
    marginTop: 5, // Space between the icon and the text
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContent: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF9800", // Fixed the color to have a valid hex value
  },
  cropImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  alertText: {
    fontSize: 16,
    color: "#FF9800",
    marginBottom: 10,
  },
});


export default Home;
