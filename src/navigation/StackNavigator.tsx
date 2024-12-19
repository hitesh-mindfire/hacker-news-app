import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerNavigator } from "./DrawerNavigator"; // Use DrawerNavigator directly
import { NavigationProps, RootStackParamList } from "../types";
import { Header } from "src/components/Header";
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
