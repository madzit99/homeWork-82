import { createSlice } from "@reduxjs/toolkit";
import { trackHistory } from "../../type";
import { fetchHistory } from "./trackHistoryThunk";

export interface trackHistoryState {
  history: trackHistory[];
  loading: boolean;
  error: boolean;
}

export const initialState: trackHistoryState = {
  history: [],
  loading: false,
  error: false,
};

const trackHistorySlice = createSlice({
  name: "trackHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      fetchHistory.fulfilled,
      (state, { payload: trackHistories }) => {
        state.loading = false;
        state.history = trackHistories;
      }
    );
    builder.addCase(fetchHistory.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
  selectors: {
    selectHistory: (state) => state.history,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
  },
});

export const trackHistoryReduser = trackHistorySlice.reducer;
export const { selectHistory, selectLoading, selectError } =
  trackHistorySlice.selectors;
