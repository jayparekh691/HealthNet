import React, { useContext, useEffect } from "react";
import AuthNavigation from "./AuthNavigation";
import DashboardNavigation from "./StackNavigator";
import SecureStoreProvider, {
  SecureStoreContext,
} from "../contexts/SecureStoreContext";
import { NavigationContainer } from "@react-navigation/native";
import { getValueFor } from "../utils/Util";
import { ActivityIndicator, View } from "react-native";
import { COLOR } from "../utils/Color";
import { ConnectivityContext } from "../contexts/ConnectivityContext";
import NetInfo from "@react-native-community/netinfo";
import AppNavigation from "./StackNavigator";
import LoadingProvider from "../contexts/LoadingContext";
import { connection } from "../services/syncServices";

function Navigation() {
  const { pinState } = useContext(SecureStoreContext);
  const [pin, setPin] = pinState;

  const { isConnectedState } = useContext(ConnectivityContext);
  const [isConnected, setIsConnected] = isConnectedState;

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
    connection(isConnected, setIsConnected);
  }, [isConnected]);

  return (
    <LoadingProvider>
      <NavigationContainer>
        {pin ? <AppNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </LoadingProvider>
  );
}

export default Navigation;
