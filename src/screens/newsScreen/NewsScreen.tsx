import { View, Text } from "react-native";
import { TabScreenProps } from "src/types";

export const NewsScreen: React.FC<TabScreenProps<"News">> = ({
  navigation,
}) => {
  console.log(navigation, "navigation");
  return (
    <View>
      <Text>NewsScreen</Text>
    </View>
  );
};
