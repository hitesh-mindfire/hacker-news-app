import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainNavigator } from "./navigation";

const App = () => {
  console.log("app component rendered");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainNavigator />
    </SafeAreaView>
  );
};

export default App;
