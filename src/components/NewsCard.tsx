import {
  useNavigation,
  useTheme,
  NavigationProp,
} from "@react-navigation/native";
import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextStyle,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { NewsCardProps } from "src/types/NewsTypes";
import { RootStackParamList } from "src/types";
import { getRelativeTime } from "src/utils";

export const NewsCard: FC<NewsCardProps> = ({ newsItem }) => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = makeStyles(colors);
  const relativeTime = getRelativeTime(newsItem?.time);

  const handlePress = () => {
    if (newsItem?.url) {
      if (Platform.OS === "web") {
        window.open(newsItem.url, "_blank");
      } else {
        navigation.navigate("WebViewScreen", { params: { url: newsItem.url } });
      }
    } else {
      Alert.alert("Web View", "News Detail is not available for this news.");
    }
  };

  return (
    <View style={styles.item}>
      <Text style={styles.titleText} numberOfLines={2} onPress={handlePress}>
        {newsItem?.title || "No title available"}
      </Text>
      <View style={styles.infoRow}>
        <Text style={styles.authorText}>
          {newsItem?.score || 0} point by {newsItem?.by || "user"}
        </Text>
        {newsItem?.time ? (
          <Text style={styles.timeText}>{relativeTime}</Text>
        ) : null}
      </View>
    </View>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    item: {
      padding: spacing.md,
      marginLeft: spacing.sm,
      marginRight: spacing.sm,
      marginBottom: spacing.sm,
      backgroundColor: colors.backgroundSecondary,
      borderRadius: spacing.sm,
      borderColor: colors.border,
      borderWidth: 1,
      shadowColor: colors.shadowBlue,
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3,
    },
    titleText: {
      fontSize: fontSize.h4,
      fontFamily: typography.bold,
      color: colors.tertiary,
      marginBottom: spacing.xs,
    } as TextStyle,
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    authorText: {
      fontSize: fontSize.body,
      color: colors.primary,
    },
    timeText: {
      fontSize: fontSize.body,
      color: colors.gray,
    },
  });
