import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MainNavigator } from "./navigation";
import { persistor, store } from "./store/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  console.log("app component rendered");
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
