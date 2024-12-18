import { View, Text } from "react-native";
import { TabScreenProps } from "src/types";

export const ProfileScreen: React.FC<TabScreenProps<"Profile">> = ({
  navigation,
}) => {
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
};
