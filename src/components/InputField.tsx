import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Colors, fontSize, spacing } from "../theme";
import { useTheme } from "@react-navigation/native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

interface InputFieldProps extends TextInputProps {
  placeholder: string;
  icon?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  onIconPress?: () => void;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  icon,
  secureTextEntry,
  onIconPress,
  value,
  onChangeText,
  errorMessage,
  ...props
}) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          errorMessage ? styles.errorBorder : null,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#a9a9a9"
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
        {icon && (
          <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
            <FontAwesome6 name={icon} size={20} color="grey" />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      marginVertical: spacing.sm,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      marginHorizontal: spacing.sm,
      backgroundColor: colors.white,
      borderColor: colors.border,
      shadowColor: colors.shadowBlue,
      shadowOpacity: 0.1,
    },
    input: {
      flex: 1,
      fontSize: fontSize.h3,
      color: colors.darkCharcole,
    },
    iconContainer: {
      paddingLeft: spacing.sm,
    },
    errorText: {
      color: colors.electicRed,
      fontSize: fontSize.h4,
      marginTop: spacing.xxs,
      marginLeft: spacing.sm,
    },
    errorBorder: {
      borderColor: colors.electicRed,
    },
  });
export default InputField;
