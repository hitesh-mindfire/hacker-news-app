import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationProps, RootStackParamList } from "../types";
import { TabNavigator } from "./TabNavigator";
import WebViewScreen from "src/screens/webViewScreen/WebViewScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = (props: NavigationProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{ title: "News Details" }}
      />
    </Stack.Navigator>
  );
};
