import { SafeAreaProvider } from "react-native-safe-area-context";
import SecureStoreProvider from "./contexts/SecureStoreContext";
import Navigation from "./navigators/Navigation";
import ConnectivityContextProvider from "./contexts/ConnectivityContext";
import AppStateProvider from "./contexts/AppStateContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <ConnectivityContextProvider>
        <AppStateProvider>
          <SecureStoreProvider>
            <Navigation />
          </SecureStoreProvider>
        </AppStateProvider>
      </ConnectivityContextProvider>
    </SafeAreaProvider>
  );
}
