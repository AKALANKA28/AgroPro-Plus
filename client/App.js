import RootNavigation from "./navigation";


// import AddBudgetPlan from "./components/finance/AddBudgetPlan";
// import BudgetPlansScreen from "./components/finance/BudgetPlansScreen";
// import BudgetPlanOverviewScreen from "./components/finance/BudgetPlanOverviewScreen";
// import EditBudgetPlanScreen from './components/finance/EditBudgetPlanScreen';
// import MarketPriceTable from './components/finance/MarketPriceTable';
// import updateExpenses from './components/finance/updateExpenses';
// import AnalysisScreen from './components/finance/AnalysisScreen'



import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function App() {
 // const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
