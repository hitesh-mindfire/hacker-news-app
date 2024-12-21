import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import { View, Text, StyleSheet, TextStyle } from "react-native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { NewsCardProps } from "src/types/NewsTypes";
import { getRelativeTime } from "src/utils";

export const NewsCard: FC<NewsCardProps> = ({ newsItem }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const relativeTime = getRelativeTime(newsItem.time);

  return (
    <View style={styles.item}>
      <Text style={styles.titleText} numberOfLines={2}>
        {newsItem.title || "No title available"}
      </Text>
      <View style={styles.infoRow}>
        <Text style={styles.authorText}>
          {newsItem?.score || 0} point by {newsItem.by || "user"}
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
      padding: spacing.sm,
      marginLeft: spacing.sm,
      marginRight: spacing.sm,
      marginBottom: spacing.sm,
      backgroundColor: colors.backgroundSecondary,
      borderRadius: spacing.xs,
      borderColor: colors.border,
      borderWidth: 1,
      shadowColor: colors.shadowBlue,
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3,
    },
    titleText: {
      fontSize: fontSize.body,
      fontWeight: typography.semiBold,
      color: colors.tertiary,
      marginBottom: spacing.xs,
    } as TextStyle,
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    authorText: {
      fontSize: fontSize.body1,
      color: colors.primary,
    },
    timeText: {
      fontSize: fontSize.body2,
      color: colors.primary,
    },
  });
