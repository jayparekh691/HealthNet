import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./DrawerNavigation";
import LockScreen from "../screen/LockScreen";

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="lockScreen"
        component={LockScreen}
      /> */}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="drawerNavigator"
        component={DrawerNavigation}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
