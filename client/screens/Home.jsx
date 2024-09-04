import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Home = () => {
  const pan = useRef(new Animated.Value(0)).current;
  const [isExpanded, setIsExpanded] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0 && !isExpanded) {
          pan.setValue(gestureState.dy);
        } else if (gestureState.dy < 0 && isExpanded) {
          pan.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > SCREEN_HEIGHT / 4) {
          setIsExpanded(true);
          Animated.spring(pan, {
            toValue: SCREEN_HEIGHT / 2,
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dy < -SCREEN_HEIGHT / 4) {
          setIsExpanded(false);
          Animated.spring(pan, {
            toValue: -SCREEN_HEIGHT / 3,
            useNativeDriver: false,
          }).start();
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const weatherSectionHeight = pan.interpolate({
    inputRange: [-SCREEN_HEIGHT / 3, 0, SCREEN_HEIGHT / 2],
    outputRange: [SCREEN_HEIGHT / 4, SCREEN_HEIGHT / 2.5, SCREEN_HEIGHT / 1.5],
    extrapolate: "clamp",
  });

  const contentSectionHeight = pan.interpolate({
    inputRange: [-SCREEN_HEIGHT / 3, 0, SCREEN_HEIGHT / 2],
    outputRange: [SCREEN_HEIGHT / 1.5, SCREEN_HEIGHT / 2.5, SCREEN_HEIGHT / 4],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.weatherSection, { height: weatherSectionHeight }]}
      >
        <Text style={styles.weatherText}>Gurgaon</Text>
        <Text style={styles.temperature}>32°C</Text>
        {/* Add additional weather details here */}
      </Animated.View>

      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.draggableSection, { height: contentSectionHeight }]}
      >
        <View style={styles.dragIndicator} />
        <Text style={styles.userName}>Welcome Ramesh Soni</Text>
        <View style={styles.cropButtons}>
          <Text style={styles.cropButton}>Cabbage</Text>
          <Text style={styles.cropButton}>Tomato</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEEB", // Sky blue color for the weather section background
  },
  weatherSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  weatherText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
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
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  cropButtons: {
    flexDirection: "row",
    marginTop: 20,
  },
  cropButton: {
    backgroundColor: "#87CEEB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    color: "#fff",
    marginRight: 10,
  },
});

export default Home;
