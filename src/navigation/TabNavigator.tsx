import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../types";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, fontSize, lineHeight, spacing, typography } from "src/theme";
import { verticalScale } from "src/utils";
import { Platform, StyleSheet } from "react-native";
import DrawerNavigator from "./DrawerNavigator";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import ProfileScreen from "src/screens/profileScreen/ProfileScreen";
import { useAppSelector } from "src/store/Store";
import { IsAuthenticated } from "src/store";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const TabNavigator = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const insets = useSafeAreaInsets();
  const userIsAuthenticated = useAppSelector(IsAuthenticated);

  return (
    <Tab.Navigator
      initialRouteName="News"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tertiary,
        headerShadowVisible: false,
        animation: "fade",
        tabBarStyle: [
          styles.container,
          styles.tabShadow,
          {
            height:
              Platform.OS !== "ios" && Platform.OS !== "android"
                ? verticalScale(50) + insets.bottom
                : verticalScale(70) + insets.bottom,
            paddingBottom: insets.bottom
              ? insets.bottom
              : verticalScale(spacing.xs),
          },
        ],
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: verticalScale(25),
          color: colors.tertiary,
          fontFamily: typography.semiBold,
        },
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="News"
        component={DrawerNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name={"newspaper"} size={20} color={color} />
          ),
          headerShown: false,
          title: "News",
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name={"user"} size={20} color={color} />
          ),
          headerShown: userIsAuthenticated,
          title: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      borderTopWidth: 0,
      paddingTop: verticalScale(spacing.xs),
      paddingHorizontal: verticalScale(spacing.sm),
    },
    tabShadow: {
      shadowColor: colors.black,
      shadowRadius: 5.65,
      elevation: 6,
    },
    tabLabel: {
      fontSize: fontSize.body,
      lineHeight: lineHeight[fontSize.body],
      fontFamily: typography.medium,
    },
  });
