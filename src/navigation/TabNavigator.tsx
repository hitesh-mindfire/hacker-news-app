import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faNewspaper,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { BottomTabParamList } from "../types";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, fontSize, lineHeight, spacing, typography } from "src/theme";
import { verticalScale } from "src/utils";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import DrawerNavigator from "./DrawerNavigator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store/Store";
import { clearUser } from "src/store/slices/UserSlice";
import { ProfileScreen } from "src/screens";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const TabNavigator = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.user.userDetails
  );
  console.log(isLoggedIn, "login");
  const handleLogout = () => {
    dispatch(clearUser());
  };
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
        headerRight: () =>
          isLoggedIn ? (
            <TouchableOpacity
              onPress={handleLogout}
              style={{
                marginRight: spacing.md,
              }}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>
          ) : null,
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
            <FontAwesomeIcon icon={faNewspaper} size={20} color={color} />
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
            <FontAwesomeIcon icon={faUser} size={20} color={color} />
          ),
          headerShown: true,
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
