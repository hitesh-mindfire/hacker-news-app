import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import { Colors, typography } from "src/theme";
import { verticalScale } from "src/utils";

export interface HeaderProps {
  headerText?: string;
  onPressLeft?: TouchableOpacityProps["onPress"];
  onPressRight?: TouchableOpacityProps["onPress"];
  leftBtnIcon?: IconDefinition;
  rightBtnIcon?: IconDefinition;
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
            <FontAwesomeIcon
              icon={leftBtnIcon}
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
            <FontAwesomeIcon
              icon={rightBtnIcon}
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
      color: colors.text,
      fontFamily: typography.medium,
    },
    leftView: {
      alignItems: "flex-start",
    },
    rightView: {
      alignItems: "flex-end",
    },
  });
