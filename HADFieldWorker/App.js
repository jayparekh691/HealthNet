import { SafeAreaProvider } from "react-native-safe-area-context";
import SecureStoreProvider from "./contexts/SecureStoreContext";
import Navigation from "./navigators/Navigation";
import ConnectivityContextProvider, {
  ConnectivityContext,
} from "./contexts/ConnectivityContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <ConnectivityContextProvider>
        <SecureStoreProvider>
          <Navigation />
        </SecureStoreProvider>
      </ConnectivityContextProvider>
    </SafeAreaProvider>
  );
}
