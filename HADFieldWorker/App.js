import { SafeAreaProvider } from "react-native-safe-area-context";
import SecureStoreProvider from "./contexts/SecureStoreContext";
import Navigation from "./navigators/Navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <SecureStoreProvider>
        <Navigation />
      </SecureStoreProvider>
    </SafeAreaProvider>
  );
}
