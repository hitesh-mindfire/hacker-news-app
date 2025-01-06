import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { endPoints } from "src/api";
import { UserDetails } from "src/types";

export const fetchUserDetails = createAsyncThunk(
  endPoints.auth.fetchUserDetails,
  async (token, { rejectWithValue }) => {
    try {
      const data: UserDetails = await api.get(endPoints.auth.fetchUserDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data, "data");
      if (!data || !data.id) throw new Error("User not found");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
