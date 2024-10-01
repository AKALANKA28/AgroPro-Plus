import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import FertilizerSchedule from "../../screens/FertilzerSchedule/FertilizerSchedule";
import ScheduleDetails from "../../screens/FertilzerSchedule/ScheduleDetails";
import FertilizerFormScreen from "../../screens/FertilzerSchedule/FertilzerFormScreen";

import CameraComponet from "../../components/CameraComponent";

import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";
import HeaderMenu from "./HeaderMenu";

import AddBudgetPlan from "../../components/finance/AddBudgetPlan";
import BudgetPlansScreen from "../../components/finance/BudgetPlansScreen";
import BudgetPlanOverviewScreen from "../../components/finance/BudgetPlanOverviewScreen";
import EditBudgetPlanScreen from '../../components/finance/EditBudgetPlanScreen';
import MarketPriceTable from '../../components/finance/MarketPriceTable';
import updateExpenses from '../../components/finance/updateExpenses';
import AnalysisScreen from '../../components/finance/AnalysisScreen'

const ScreenMenu = () => {
  //global state
  const [state] = useContext(AuthContext);
  //auth condition true false
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      {/* {authenticatedUser ? ( */}
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
            headerShown: true,
            headerTitle: "Schedule Details", // Set your header title
            headerTitleAlign: "center", // Center the header title
          }}
        />

        {/* <Stack.Screen
            name="Camera"
            component={CameraComponet}
            options={{
              headerShown: false,
            }}
          /> */}
 
        <Stack.Screen
          name="FertilizerFormScreen"
          component={FertilizerFormScreen}
          options={{
            headerShown: false,
          }}
          
        />
         <Stack.Screen name="AddBudgetPlan" component={AddBudgetPlan} options={{headerShown:true,headerTitle: '' }}/>
        <Stack.Screen name="BudgetPlansScreen" component={BudgetPlansScreen} options={{headerShown:true,headerTitle: '' }}/>
        <Stack.Screen name="Budget Plan Overview" component={BudgetPlanOverviewScreen} options={{headerShown:true,headerTitle: '' }}/>
        <Stack.Screen name="EditBudgetPlanScreen" component={EditBudgetPlanScreen} options={{headerShown:true,headerTitle: '' }}/>
        <Stack.Screen name="MarketPriceTable" component={MarketPriceTable} options={{headerShown:true,headerTitle: '' }}/>
        <Stack.Screen name="updateExpenses" component={updateExpenses} options={{headerShown:true,headerTitle: '' }}/>
        <Stack.Screen name="AnalysisScreen" component={AnalysisScreen} options={{headerShown:true,headerTitle: '' }}/>
      </>
      {/* ) : (
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
      ) */}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
