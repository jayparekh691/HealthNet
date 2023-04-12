import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RecordsScreen from "../screen/RecordsScreen";
import { Feather } from "@expo/vector-icons";
import { COLOR } from "../utils/Color";
import Dashboard from "../screen/Dashboard";
import { Dimensions } from "react-native";

const Drawer = createDrawerNavigator();

function DrawerNavigation(props) {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => {
          return (
            <Feather
              style={{
                marginLeft: 12,
              }}
              name="sidebar"
              color={COLOR.primaryColor}
              size={28}
              onPress={() => navigation.toggleDrawer()}
            />
          );
        },
        headerTintColor: COLOR.primaryColor,
        drawerActiveTintColor: COLOR.primaryColor,
        drawerActiveBackgroundColor: COLOR.backgroundColor,
      })}
    >
      <Drawer.Screen
        options={{
          headerTitle: "Appointments",
          title: "Dashboard",
        }}
        name="dashboard"
        component={Dashboard}
      />
      <Drawer.Screen
        options={{
          headerTitle: "Appoinment Records",
          title: "Records",
        }}
        name="recordScreen"
        component={RecordsScreen}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
