import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useCallback } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { loginUser } from "src/store";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { useTheme } from "@react-navigation/native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/Store";
import { fetchUserDetails } from "src/services/UserService";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  const dispatch = useDispatch<AppDispatch>();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_EXPO_GO_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  });

  const getUserInfo = async (token: string) => {
    try {
      const data = await fetchUserDetails(token);
      console.log(data, "data");
      dispatch(loginUser({ user: { ...data, token } }));
    } catch (error: any) {
      console.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      getUserInfo(response.authentication.accessToken);
    }
  }, [response, getUserInfo]);

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.title}>Hello There!</Text>
        <Text style={styles.description}>
          Please log in to view your profile
        </Text>
      </View>
      {/* Spacer to push the login button to the bottom */}
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        onPress={() => promptAsync()}
        style={styles.loginBtn}
        disabled={!request}
      >
        <FontAwesome6 name="google" size={fontSize.h2} color={colors.white} />
        <Text style={styles.btnText}>Log in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
    },
    welcome: {
      flex: 0.4,
      backgroundColor: colors.primary,
      padding: spacing.lg,
      borderRadius: spacing.md,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.xl,
    },
    title: {
      fontSize: fontSize.h1,
      color: colors.tertiary,
      fontFamily: typography.bold,
      marginBottom: 5,
    },
    description: {
      fontSize: fontSize.body,
      color: colors.tertiary,
      fontFamily: typography.medium,
      textAlign: "center",
    },
    loginBtn: {
      backgroundColor: colors.tertiary,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: spacing.xl,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.xl,
    },
    btnText: {
      color: colors.white,
      fontFamily: typography.bold,
      fontSize: fontSize.body,
      textAlign: "center",
      marginLeft: spacing.xs,
    },
  });
