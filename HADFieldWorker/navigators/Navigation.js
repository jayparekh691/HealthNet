import React, { useContext, useEffect } from "react";
import AuthNavigation from "./AuthNavigation";
import DashboardNavigation from "./StackNavigator";
import SecureStoreProvider, {
  SecureStoreContext,
} from "../contexts/SecureStoreContext";
import StackNavigator from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { getValueFor } from "../utils/util";
import { ActivityIndicator, View } from "react-native";
import { COLOR } from "../utils/Color";
import { ConnectivityContext } from "../contexts/ConnectivityContext";
import NetInfo from "@react-native-community/netinfo";

function Navigation() {
  const [pin, setPin, isAuthenticating, setIsAuthenticating] =
    useContext(SecureStoreContext);

  const [isConnected, setIsConnected] = useContext(ConnectivityContext);
  useEffect(() => {
    NetInfo.addEventListener((state) => {
      if (isConnected != state.isInternetReachable) {
        console.log("internet connection: ", state.isInternetReachable);
        setIsConnected(state.isInternetReachable);
      }
    });
  }, [isConnected]);

  useEffect(() => {
    (async () => {
      const checkPin = await getValueFor("pin");
      console.log("navigation: ", checkPin);
      setPin(checkPin);
      setIsAuthenticating(false);
    })();
  }, [pin, isAuthenticating]);

  if (isAuthenticating) {
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
  }

  return (
    <NavigationContainer>
      {pin ? <StackNavigator /> : <AuthNavigation />}
    </NavigationContainer>
  );
}

export default Navigation;
