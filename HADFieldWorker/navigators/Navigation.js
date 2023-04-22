import React, { useContext, useEffect, useRef, useState } from "react";
import AuthNavigation from "./AuthNavigation";
import DashboardNavigation from "./StackNavigator";
import SecureStoreProvider, {
  SecureStoreContext,
} from "../contexts/SecureStoreContext";
import { NavigationContainer } from "@react-navigation/native";
import { getValueFor } from "../utils/util";
import { ActivityIndicator, View } from "react-native";
import { COLOR } from "../utils/Color";
import { ConnectivityContext } from "../contexts/ConnectivityContext";
import NetInfo from "@react-native-community/netinfo";
import AppNavigation from "./StackNavigator";
import LoadingProvider from "../contexts/LoadingContext";

function Navigation() {
  const { pinState } = useContext(SecureStoreContext);
  const [pin, setPin] = pinState;

  const { isConnectedState } = useContext(ConnectivityContext);
  const [isConnected, setIsConnected] = isConnectedState;
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    getValueFor("pin")
      .then((result) => {
        console.log(result);
        setPin(result);
        setShowLoading(false);
      })
      .catch((error) => {
        setPin(null);
        setShowLoading(false);
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

  if (showLoading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={COLOR.primaryColor} />
      </View>
    );

  return (
    <LoadingProvider>
      <NavigationContainer>
        {pin ? <AppNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </LoadingProvider>
  );
}

export default Navigation;
