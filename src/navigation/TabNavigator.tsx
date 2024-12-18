import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NewsScreen, ProfileScreen } from "../screens";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faNewspaper, faUser } from "@fortawesome/free-solid-svg-icons";

import { BottomTabParamList } from "../types";
import { useTheme } from "@react-navigation/native";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const TabNavigator = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tertiary,
      }}
    >
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faNewspaper} size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUser} size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
