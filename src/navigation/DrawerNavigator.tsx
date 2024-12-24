import React, { FC } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import { Colors } from "src/theme";
import { Platform, StyleSheet } from "react-native";
import { DrawerParamList, TabScreenProps } from "src/types";
import { Header } from "src/components";
import { NewsContentScreen } from "src/screens";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator: FC<TabScreenProps<"News">> = () => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  return (
    <>
      <Drawer.Navigator
        initialRouteName="New"
        screenOptions={{
          headerShadowVisible: false,
          header: ({ navigation, options }) => {
            return (
              <Header
                headerText={options.title}
                leftBtnIcon={faBars}
                onPressLeft={navigation.openDrawer}
              />
            );
          },
          drawerStyle: styles.drawerContainer,
          drawerActiveTintColor: colors.primary,
          drawerInactiveTintColor: colors.tertiary,
        }}
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
