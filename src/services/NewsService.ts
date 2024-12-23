import { News } from "src/types/NewsTypes";
import api, { endPoints } from "../api";

export const fetchNewsDetails = async (id: number): Promise<News> => {
  return api.get(endPoints.news.newNewsDetails + "/" + id + ".json");
};
