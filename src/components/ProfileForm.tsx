import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Alert, StyleSheet } from "react-native";
import { AppDispatch, RootState } from "src/store/Store";
import { fetchUserDetails } from "src/store/actions/UserActions";
import { Colors, spacing } from "src/theme";
import { useTheme } from "@react-navigation/native";
import InputField from "./InputField";
import Button from "./Button";
import { Spinner } from "./Spinner";

const ProfileForm: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: apiError } = useSelector(
    (state: RootState) => state.user
  );

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
