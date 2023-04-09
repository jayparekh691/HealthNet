import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./DrawerNavigation";
import LockScreen from "../screen/LockScreen";
import MedicalDataScreen from "../screen/MedicalDataScreen";
import { COLOR } from "../utils/Color";

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: COLOR.primaryColor,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="lockScreen"
        component={LockScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="drawerNavigator"
        component={DrawerNavigation}
      />
      <Stack.Screen
        options={{
          headerTitle: "Health Metrics",
        }}
        name="medicalData"
        component={MedicalDataScreen}
      />
    </Stack.Navigator>
  );
}

export default AppNavigation;
