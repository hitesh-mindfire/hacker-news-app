import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationProps, RootStackParamList } from "../types";
import { TabNavigator } from "./TabNavigator";

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
    </Stack.Navigator>
  );
};
