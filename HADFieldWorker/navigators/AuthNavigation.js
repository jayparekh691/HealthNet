import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SetupPin from "../screen/SetupPin";
import LoginScreen from "../screen/LoginScreen";

const Stack = createNativeStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgrourndColor: "white",
        },
        headerTitle: "",
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="loginScreen"
        component={LoginScreen}
      />
      <Stack.Screen name="setuppin" component={SetupPin} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
