import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
  Home: undefined;
};

export type BottomTabParamList = {
  News: undefined;
  Profile: undefined;
};

export type StackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof BottomTabParamList> =
  BottomTabScreenProps<BottomTabParamList, T>;
