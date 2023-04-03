import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthNavigation from "./navigators/AuthNavigation";
import DashboardNavigation from "./navigators/StackNavigator";

export default function App() {
  const flag = false;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {flag ? <AuthNavigation /> : <DashboardNavigation />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
