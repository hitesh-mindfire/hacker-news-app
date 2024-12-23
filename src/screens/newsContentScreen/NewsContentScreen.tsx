import React from "react";
import { NewsList } from "src/components/NewsList";
import { DrawerProps } from "src/types";

export const NewsContentScreen = ({ route }: DrawerProps<"New" | "Past">) => {
  const { params } = route;
  const content = params.content;
  return content == "New" ? (
    <NewsList newsType="New" />
  ) : (
    <NewsList newsType="Past" />
  );
};
