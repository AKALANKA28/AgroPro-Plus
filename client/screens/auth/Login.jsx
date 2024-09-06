import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Uncomment the base URL if needed
// axios.defaults.baseURL = "http://192.168.1.159:8000";

const Login = ({ navigation }) => {
  // Global state
  const [state, setState] = useContext(AuthContext);

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!email || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      
      console.log("Sending login request with data:", { email, password });

      const { data } = await axios.post("/auth/login", { email, password });

      console.log("Login response data:", data);

      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));

      Alert.alert("Success", data.message || "Login successful");
      navigation.navigate("Home");
      
      console.log("Login Data==> ", { email, password });
    } catch (error) {
      // Check if error.response exists before accessing its properties
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      Alert.alert("Error", errorMessage);
      
      console.log("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Temporary function to check local storage data
  const getLocalStorageData = async () => {
    try {
      let data = await AsyncStorage.getItem("@auth");
      console.log("Local Storage Data==>", data);
    } catch (error) {
      console.log("Error fetching local storage data:", error);
    }
  };

  // Call getLocalStorageData on component mount
  React.useEffect(() => {
    getLocalStorageData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox
          inputTitle={"Email"}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
      </View>
      <SubmitButton
        btnTitle="Login"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Not a user? Please{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          REGISTER
        </Text>{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e1d5c9",
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e2225",
    marginBottom: 20,
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "red",
  },
});

export default Login;
