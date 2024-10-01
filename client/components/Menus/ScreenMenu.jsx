import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import FertilizerSchedule from "../../screens/FertilzerSchedule/FertilizerSchedule";
import ScheduleDetails from "../../screens/FertilzerSchedule/ScheduleDetails";

import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";
import HeaderMenu from "./HeaderMenu";
// import Post from "../../screens/Post";
// import About from "../../screens/About";
// import Account from "../../screens/Account";
// import Myposts from "../../screens/Myposts";
const ScreenMenu = () => {
  //global state
  const [state] = useContext(AuthContext);
  //auth condition true false
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              title: "Full Stack App",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="FertilizerSchedule"
            component={FertilizerSchedule}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ScheduleDetails"
            component={ScheduleDetails}
            options={{
              headerShown: false,
            }}
          />
          {/*    <Stack.Screen
            name="About"
            component={About}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Myposts"
            component={Myposts}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          /> */}
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
