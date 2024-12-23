import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { Spinner } from "src/components/Spinner";
import { StackScreenProps } from "src/types";

const WebViewScreen: FC<StackScreenProps<"WebViewScreen">> = ({ route }) => {
  const { url } = route?.params?.params;
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <Spinner loading />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WebViewScreen;
