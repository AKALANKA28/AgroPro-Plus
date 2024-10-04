import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";
import HeaderMenu from "./HeaderMenu";
<<<<<<< Updated upstream
// import Post from "../../screens/Post";
// import About from "../../screens/About";
// import Account from "../../screens/Account";
// import Myposts from "../../screens/Myposts";
=======
import Community from "../../screens/Community";
import SpecialNotices from "../../screens/SpecialNotices";
import ShareExperience from "../../screens/ShareExperience";
import ChatApp from "../../screens/ChatApp";

>>>>>>> Stashed changes
const ScreenMenu = () => {
  //global state
  const [state] = useContext(AuthContext);
  //auth condition true false
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  return (
    // <Stack.Navigator initialRouteName="Login">
    //   {authenticatedUser ? (
    //     <>
    //       <Stack.Screen
    //         name="Home"
    //         component={Home}
    //         options={{
    //           headerShown: false,
    //           title: "Full Stack App",
    //           headerRight: () => <HeaderMenu />,
    //         }}
    //       />
    //       {/* <Stack.Screen
    //         name="Post"
    //         component={Post}
    //         options={{
    //           headerBackTitle: "Back",
    //           headerRight: () => <HeaderMenu />,
    //         }}
    //       />
    //       <Stack.Screen
    //         name="About"
    //         component={About}
    //         options={{
    //           headerBackTitle: "Back",
    //           headerRight: () => <HeaderMenu />,
    //         }}
    //       />
    //       <Stack.Screen
    //         name="Account"
    //         component={Account}
    //         options={{
    //           headerBackTitle: "Back",
    //           headerRight: () => <HeaderMenu />,
    //         }}
    //       />
    //       <Stack.Screen
    //         name="Myposts"
    //         component={Myposts}
    //         options={{
    //           headerBackTitle: "Back",
    //           headerRight: () => <HeaderMenu />,
    //         }}
    //       /> */}
    //     </>
    //   ) : (
    //     <>
    //       <Stack.Screen
    //         name="Login"
    //         component={Login}
    //         options={{ headerShown: false }}
    //       />
    //       <Stack.Screen
    //         name="Register"
    //         component={Register}
    //         options={{ headerShown: false }}
    //       />
    //     </>
    //   )}
    // </Stack.Navigator>
    <Stack.Navigator initialRouteName="Home">
    {
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
<<<<<<< Updated upstream
=======
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
            headerShown: true,
            headerTitle: "Schedule Details", // Set your header title
            headerTitleAlign: "center", // Center the header title
          }}
        />

        <Stack.Screen
          name="Community"
          component={Community}
          options={{
            headerShown: false,
          }}
          
        />

        <Stack.Screen
          name="SpecialNotices"
          component={SpecialNotices}
          options={{
            headerShown: false,
          }}
          
        />

        <Stack.Screen
          name="ShareExperience"
          component={ShareExperience}
          options={{
            headerShown: false,
          }}
          
        />

        <Stack.Screen
          name="ChatApp"
          component={ChatApp}
          options={{
            headerShown: false,
          }}
          
        />

>>>>>>> Stashed changes
        {/* <Stack.Screen
          name="Post"
          component={Post}
          options={{
            headerBackTitle: "Back",
            headerRight: () => <HeaderMenu />,
          }}
        />
        <Stack.Screen
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
    }
  </Stack.Navigator>
  );
};

export default ScreenMenu;
