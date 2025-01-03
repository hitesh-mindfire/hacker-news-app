import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Alert, StyleSheet, Platform } from "react-native";
import { AppDispatch, RootState } from "src/store/Store";
import { fetchUserDetails } from "src/store/actions/UserActions";
import { Colors, spacing } from "src/theme";
import { useTheme } from "@react-navigation/native";
import InputField from "./InputField";
import Button from "./Button";
import { Spinner } from "./Spinner";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const ProfileForm: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [error, setError] = useState<string>("");
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: apiError } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      console.log(token, "token");
      token && setExpoPushToken(token);
    });
  }, []);
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("myNotificationChannel", {
        name: "A channel is needed for the permissions prompt to appear",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error("Project ID not found");
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(token);
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  useEffect(() => {
    if (apiError) {
      Alert.alert("Error", apiError);
    }
  }, [apiError]);

  const handleLogin = () => {
    if (!username.trim()) {
      setError("Username is required");
      return;
    }
    setError("");
    dispatch(fetchUserDetails(username));
  };
  if (loading) {
    return <Spinner loading />;
  }

  const sendPushNotification = async () => {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Hello!",
      body: "This is a test notification from Expo!",
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };
  return (
    <View style={styles.container}>
      <InputField
        placeholder="Enter username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          if (error && text.trim()) {
            setError("");
          }
        }}
        errorMessage={error}
      />
      <View style={styles.bottomContainer}>
        <Button
          title="Get Profile"
          onPress={handleLogin}
          disabled={loading || !!error}
        />
        <Button
          title="Send Notification"
          onPress={sendPushNotification}
          disabled={!expoPushToken}
        />
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
    },
    bottomContainer: {
      marginTop: "auto",
      paddingHorizontal: spacing.sm,
      paddingBottom: spacing.sm,
    },
  });

export default ProfileForm;
