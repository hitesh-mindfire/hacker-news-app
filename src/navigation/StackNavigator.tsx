import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";
import { NavigationProps, RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = (props: NavigationProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
