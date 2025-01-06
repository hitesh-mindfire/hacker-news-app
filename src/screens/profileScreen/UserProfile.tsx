import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, typography, spacing } from "src/theme";
import { logoutUser, selectUser } from "src/store";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AppDispatch, useAppSelector } from "src/store/Store";
import { useDispatch } from "react-redux";

const UserProfile = () => {
  const { user } = useAppSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme();
  const styles = makeStyle(colors);

  return (
    <View style={styles.container}>
      <Image src={user?.picture} style={styles.profilePicture} />
      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.name}>{user?.name ?? "User"}</Text>
      <Text style={styles.email}>Email: {user?.email ?? "Not available"}</Text>
      <Text style={styles.phone}>Phone: {user?.phone ?? "Not available"}</Text>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          dispatch(logoutUser());
        }}
      >
        <AntDesign name="logout" size={fontSize.body} color={colors.white} />
        <Text style={styles.logoutTxt}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: spacing.lg,
      alignItems: "center",
    },
    profilePicture: {
      height: 120,
      width: 120,
      borderRadius: 60,
      backgroundColor: colors.grayX11,
      marginBottom: spacing.lg,
    },
    welcome: {
      fontSize: fontSize.h2,
      color: colors.grayX11,
      fontFamily: typography.regular,
      marginBottom: spacing.sm,
    },
    name: {
      fontSize: fontSize.h1,
      color: colors.primary,
      fontFamily: typography.bold,
      marginBottom: spacing.sm,
    },
    email: {
      fontSize: fontSize.body,
      color: colors.text,
      fontFamily: typography.medium,
      marginBottom: spacing.sm,
    },
    phone: {
      fontSize: fontSize.body,
      color: colors.text,
      fontFamily: typography.medium,
      marginBottom: spacing.lg,
    },
    logoutBtn: {
      flexDirection: "row",
      gap: spacing.sm,
      width: "100%",
      backgroundColor: colors.tertiary,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: spacing.md,
      justifyContent: "center",
      alignItems: "center",
      marginTop: "auto",
    },
    logoutTxt: {
      color: colors.white,
      fontSize: fontSize.body,
      fontFamily: typography.bold,
    },
  });
