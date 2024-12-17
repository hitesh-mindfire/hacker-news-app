import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NewsScreen, ProfileScreen } from "../screens";
import { BottomTabParamList } from "../types";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="News" component={NewsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
