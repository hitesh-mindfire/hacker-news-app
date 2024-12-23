import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerScreenProps } from "@react-navigation/drawer";

export type RootStackParamList = {
  Home: undefined;
};

export type BottomTabParamList = {
  News: undefined;
  Profile: undefined;
};

export type DrawerParamList = {
  New: { content: string };
  Past: { content: string };
};
export type DrawerProps<T extends keyof DrawerParamList> = DrawerScreenProps<
  DrawerParamList,
  T
>;

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export type StackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof BottomTabParamList> =
  BottomTabScreenProps<BottomTabParamList, T>;
