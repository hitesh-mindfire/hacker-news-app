import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  console.log("app component rendered");
  return (
    <SafeAreaView>
      <View>
        <Text>App Component</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
