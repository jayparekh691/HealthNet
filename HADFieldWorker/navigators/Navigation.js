import React, { useContext, useEffect } from "react";
import AuthNavigation from "./AuthNavigation";
import DashboardNavigation from "./StackNavigator";
import SecureStoreProvider, {
  SecureStoreContext,
} from "../contexts/SecureStoreContext";
import StackNavigator from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { getValueFor } from "../utils/Util";
import { ActivityIndicator, View } from "react-native";
import { COLOR } from "../utils/Color";
import { ConnectivityContext } from "../contexts/ConnectivityContext";
import NetInfo from "@react-native-community/netinfo";

function Navigation() {
  const { pinState } = useContext(SecureStoreContext);
  const [pin, setPin] = pinState;

  const [isConnected, setIsConnected] = useContext(ConnectivityContext);

  useEffect(() => {
    getValueFor("pin")
      .then((result) => {
        console.log(result);
        setPin(result);
      })
      .catch((error) => {
        setPin(null);
      });
  }, []);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      if (isConnected != state.isInternetReachable) {
        console.log("internet connection: ", state.isInternetReachable);
        setIsConnected(state.isInternetReachable);
      }
    });
  }, [isConnected]);

  return (
    <NavigationContainer>
      {pin ? <StackNavigator /> : <AuthNavigation />}
    </NavigationContainer>
  );
}

export default Navigation;
