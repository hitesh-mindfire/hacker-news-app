import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Button from "src/components/Button";
import ProfileForm from "src/components/ProfileForm";
import { RootState } from "src/store/Store";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { TabScreenProps } from "src/types";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export const ProfileScreen: FC<TabScreenProps<"Profile">> = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { userDetails } = useSelector((state: RootState) => state.user);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "1025169337694-kf0e999spu85402n1ri6bcjfl6rdluod.apps.googleusercontent.com",
    // scopes: ["profile", "email"],
  });

  React.useEffect(() => {
    console.log(response, "response");
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Google Auth Success", authentication);
    }
  }, [response]);

  if (!userDetails) {
    return (
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => promptAsync()}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <FontAwesomeIcon icon={faUser} size={20} color={colors.gray} />
        <Text style={styles.username}>{userDetails.id}</Text>
        <Text style={styles.karma}>Karma: {userDetails.karma}</Text>
        <Text style={styles.created}>
          Created: {new Date(userDetails.created * 1000).toLocaleDateString()}
        </Text>
        {userDetails.about && (
          <Text style={styles.about}>{userDetails.about}</Text>
        )}
      </View>
    </View>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.md,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      backgroundColor: colors.backgroundSecondary,
      padding: spacing.lg,
      borderRadius: spacing.md,
      borderColor: colors.border,
      borderWidth: 1,
      shadowColor: colors.shadowBlue,
      shadowOpacity: 0.1,
      shadowRadius: 2,
      width: "90%",
      alignItems: "center",
    },
    username: {
      fontSize: fontSize.h2,
      fontFamily: typography.semiBold,
      color: colors.primary,
      margin: spacing.sm,
    },
    karma: {
      fontSize: fontSize.h4,
      fontFamily: typography.medium,
      color: colors.tertiary,
      marginBottom: spacing.sm,
    },
    created: {
      fontSize: fontSize.h4,
      fontFamily: typography.regular,
      color: colors.tertiary,
      marginBottom: spacing.sm,
    },
    about: {
      fontSize: fontSize.h5,
      fontFamily: typography.light,
      color: colors.tertiary,
      textAlign: "center",
      marginBottom: spacing.md,
    },
  });
