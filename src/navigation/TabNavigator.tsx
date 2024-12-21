import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faNewspaper, faUser } from "@fortawesome/free-solid-svg-icons";

import { BottomTabParamList } from "../types";
import { useTheme } from "@react-navigation/native";
import NewsScreen from "src/screens/newsScreen/NewsScreen";
import { ProfileScreen } from "src/screens";
import { Header } from "src/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, fontSize, lineHeight, spacing, typography } from "src/theme";
import { verticalScale } from "src/utils";
import { Platform, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const TabNavigator = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="News"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tertiary,
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
        tabBarLabelStyle: styles.tabLabel,
        header: ({ options }) => {
          return <Header headerText={options.title} />;
        },
      }}
    >
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faNewspaper} size={20} color={color} />
          ),
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
