import React, { FC } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import { Colors, spacing, typography } from "src/theme";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerParamList, TabScreenProps } from "src/types";
import { NewsContentScreen } from "src/screens";
import { verticalScale } from "src/utils";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator: FC<TabScreenProps<"News">> = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);

  return (
    <>
      <Drawer.Navigator
        initialRouteName="New"
        screenOptions={({ navigation }) => ({
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: verticalScale(25),
            color: colors.tertiary,
            fontFamily: typography.semiBold,
          },
          drawerStyle: styles.drawerContainer,
          drawerActiveTintColor: colors.primary,
          drawerInactiveTintColor: colors.tertiary,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: spacing.md }}
            >
              <FontAwesome6 name={"bars"} size={20} color={colors.tertiary} />
            </TouchableOpacity>
          ),
        })}
      >
        <Drawer.Screen
          name="New"
          component={NewsContentScreen}
          options={{ title: "New news" }}
          initialParams={{ content: "New" }}
        />
        <Drawer.Screen
          name="Past"
          component={NewsContentScreen}
          options={{ title: "Past news" }}
          initialParams={{ content: "Past" }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigator;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    drawerContainer: {
      backgroundColor: colors.backgroundSecondary,
      borderEndEndRadius: 0,
      borderEndStartRadius: 0,
      width: Platform.OS === "android" || Platform.OS === "ios" ? "60%" : 300,
    },
  });
