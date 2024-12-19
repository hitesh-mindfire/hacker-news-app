import React, { FC } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@react-navigation/native";
import { Colors } from "src/theme";
import { Platform, StyleSheet } from "react-native";
import { DrawerParamList, TabScreenProps } from "src/types";
import { NewScreen } from "../newScreen/NewScreen";
import { PastScreen } from "../pastScreen/PastScreen";
import { Header } from "src/components/Header";

const Drawer = createDrawerNavigator<DrawerParamList>();

const NewsScreen: FC<TabScreenProps<"News">> = () => {
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
                rightBtnIcon={faUser}
                onPressLeft={navigation.openDrawer}
              />
            );
          },
          drawerStyle: styles.drawerContainer,
        }}
      >
        <Drawer.Screen
          name="New"
          component={NewScreen}
          options={{ title: "New news" }}
        />
        <Drawer.Screen
          name="Past"
          component={PastScreen}
          options={{ title: "Past news" }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default NewsScreen;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    drawerContainer: {
      backgroundColor: colors.backgroundSecondary,
      borderEndEndRadius: 4,
      borderEndStartRadius: 4,
      width: Platform.OS === "android" || Platform.OS === "ios" ? "50%" : 300,
    },
  });
