import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, fontSize, spacing, typography } from "../theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={disabled ? () => {} : onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.yankeesBlue,
    padding: spacing.sm,
    borderRadius: spacing.sm,
    alignItems: "center",
    marginVertical: spacing.xxs,
  },
  text: {
    color: colors.white,
    fontSize: fontSize.h3,
    fontFamily: typography.semiBold,
  },
  disabled: {
    backgroundColor: colors.gray,
  },
  disabledText: {
    color: colors.gray,
  },
});

export default Button;
