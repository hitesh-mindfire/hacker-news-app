import React, { useEffect } from "react";
import { NewsList } from "src/components/NewsList";
import { DrawerProps } from "src/types";

export const NewsContentScreen = ({ route }: DrawerProps<"New" | "Past">) => {
  const { params } = route;
  const content = params.content;
  return <NewsList newsType={content as "New" | "Past"} />;
};
