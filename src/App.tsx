import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { persistor, store } from "./store/Store";
import { MainNavigator } from "./navigation";
import {
  registerForPushNotificationsAsync,
  setupAndroidNotificationChannel,
} from "./utils/Notification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const App = () => {
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    setupAndroidNotificationChannel();
    registerForPushNotificationsAsync();

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <SafeAreaProvider>
          <MainNavigator />
        </SafeAreaProvider>
      </Provider>
    </PersistGate>
  );
};
export default App;
