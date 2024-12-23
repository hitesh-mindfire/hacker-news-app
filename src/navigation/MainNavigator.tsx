import { NavigationContainer } from "@react-navigation/native";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "src/theme";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { StackNavigator } from "./StackNavigator";
import { NavigationProps } from "src/types";

export const MainNavigator = (props: NavigationProps) => {
  const scheme = useColorScheme();
  const [fontLoaded, error] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const appTheme = useMemo(() => {
    const isDarkMode = scheme === "dark";
    return isDarkMode ? darkTheme : lightTheme;
  }, [darkTheme, lightTheme, scheme]);
  if (!fontLoaded && !error) {
    return null;
  }

  return (
    <NavigationContainer theme={appTheme} {...props}>
      <StackNavigator {...props} />
    </NavigationContainer>
  );
};
