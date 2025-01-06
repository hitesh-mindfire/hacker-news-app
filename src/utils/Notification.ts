import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export const handleRegistrationError = (errorMessage: string) => {
  alert(errorMessage);
  throw new Error(errorMessage);
};

export const setupAndroidNotificationChannel = async () => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};

export const registerForPushNotificationsAsync = async (): Promise<
  string | void
> => {
  if (!Device.isDevice) {
    return handleRegistrationError(
      "Must use physical device for push notifications"
    );
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  const finalStatus =
    existingStatus === "granted"
      ? existingStatus
      : (await Notifications.requestPermissionsAsync()).status;

  if (finalStatus !== "granted") {
    return handleRegistrationError(
      "Permission not granted to get push token for push notification!"
    );
  }

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;
  if (!projectId) {
    return handleRegistrationError("Project ID not found");
  }

  try {
    const pushToken = (await Notifications.getExpoPushTokenAsync({ projectId }))
      .data;
    console.log(pushToken);
    return pushToken;
  } catch (error) {
    return handleRegistrationError(`${error}`);
  }
};
