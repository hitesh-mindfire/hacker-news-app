import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import { Colors, typography } from "src/theme";
import { verticalScale } from "src/utils";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export interface HeaderProps {
  headerText?: string;
  onPressLeft?: TouchableOpacityProps["onPress"];
  onPressRight?: TouchableOpacityProps["onPress"];
  leftBtnIcon?: string;
  rightBtnIcon?: string;
}
export const Header = (props: HeaderProps) => {
  const {
    headerText,
    onPressLeft,
    onPressRight,
    leftBtnIcon,
    rightBtnIcon,
    ...rest
  } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={[styles.container]} {...rest}>
      <View style={styles.leftView}>
        {leftBtnIcon && (
          <TouchableOpacity onPress={onPressLeft}>
            <FontAwesome6
              name={"arrow-left"}
              size={20}
              color={colors.tertiary}
            />
          </TouchableOpacity>
        )}
      </View>
      {headerText && <Text style={styles.headerText}>{headerText}</Text>}
      <View style={styles.rightView}>
        {rightBtnIcon && (
          <TouchableOpacity onPress={onPressRight}>
            <FontAwesome6
              name={"arrow-right"}
              size={20}
              color={colors.tertiary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 5,
      backgroundColor: colors.background,
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    headerText: {
      fontSize: verticalScale(20),
      justifyContent: "center",
      alignItems: "center",
      color: colors.tertiary,
      fontFamily: typography.medium,
    },
    leftView: {
      alignItems: "flex-start",
    },
    rightView: {
      alignItems: "flex-end",
    },
  });
