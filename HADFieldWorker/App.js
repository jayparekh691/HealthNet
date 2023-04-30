import SecureStoreProvider from "./contexts/SecureStoreContext";
import Navigation from "./navigators/Navigation";
import ConnectivityContextProvider from "./contexts/ConnectivityContext";
import AppStateProvider from "./contexts/AppStateContext";

export default function App() {
  return (
    <ConnectivityContextProvider>
      <AppStateProvider>
        <SecureStoreProvider>
          <Navigation />
        </SecureStoreProvider>
      </AppStateProvider>
    </ConnectivityContextProvider>
  );
}
