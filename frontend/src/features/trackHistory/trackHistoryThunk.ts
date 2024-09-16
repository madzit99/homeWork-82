import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axiosApi from "../../axiosApi";
import { trackHistory } from "../../type";

export const fetchHistory = createAsyncThunk<
  trackHistory[],
  void,
  { state: RootState }
>("trackHistory/fetchAll", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;
    let history: trackHistory[] = [];

    if (token) {
      const response = await axiosApi.get<trackHistory[]>("/trackHistory", {
        headers: { Authorization: `Bearer ${token}` },
      });
      history = response.data;
    }

    return history;
  } catch (e) {
    console.error(e);
    throw e;
  }
});

export const sendTrackHistory = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("trackHistory/post", async (trackId, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      const data = {
        track: trackId,
      };
      await axiosApi.post("/trackHistory", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (e) {
    console.error(e);
  }
});
