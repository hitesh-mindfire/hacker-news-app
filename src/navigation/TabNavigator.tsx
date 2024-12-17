import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NewsScreen, ProfileScreen } from "../screens";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faNewspaper, faUser } from "@fortawesome/free-solid-svg-icons";

import { BottomTabParamList } from "../types";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "green",
      tabBarInactiveTintColor: "gray",
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
