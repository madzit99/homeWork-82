import { createSlice } from "@reduxjs/toolkit";
import { Artist, Track, trackHistory } from "../../type";

export interface trackHistoryState {
  history: trackHistory[];
  loading: boolean;
  error: boolean;
}

export const initialState: trackHistoryState = {
    history: [],
    loading: false,
    error: false
};

const trackHistorySlice = createSlice({
    name: "trackHistory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
    selectors: {
        seclectHistory: (state) => state.history,
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error,
    },
    
})

export const trackHistoryReduser = trackHistorySlice.reducer
