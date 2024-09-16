import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axiosApi from "../../axiosApi";

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
