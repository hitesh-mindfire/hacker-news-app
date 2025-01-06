import React, { FC } from "react";
import UserProfile from "./UserProfile";
import { TabScreenProps } from "src/types";
import { useSelector } from "react-redux";
import { IsAuthenticated } from "src/store";
import LoginScreen from "../loginScreen/LoginScreen";

const ProfileScreen: FC<TabScreenProps<"Profile">> = () => {
  const userIsAuthenticated = useSelector(IsAuthenticated);
  console.log(userIsAuthenticated);
  return userIsAuthenticated ? <UserProfile /> : <LoginScreen />;
};

export default ProfileScreen;
