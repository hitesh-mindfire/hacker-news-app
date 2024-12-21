import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { endPoints } from "src/api";

export const fetchNewNewsIds = createAsyncThunk(
  endPoints.news.newNews,
  async () => {
    const response: number[] = await api.get(endPoints.news.newNews);
    return response;
  }
);

export const fetchPastNewsIds = createAsyncThunk(
  endPoints.news.pastNews,
  async () => {
    const response: number[] = await api.get(endPoints.news.pastNews);
    return response;
  }
);
