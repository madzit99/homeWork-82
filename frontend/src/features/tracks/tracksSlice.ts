import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../../type";
import { fetchTracks } from "./trackThunks";

export interface TracksState {
  tracks: Track[];
  oneTrack: Track | null;
  loading: boolean;
  error: boolean;
}

const initialState: TracksState = {
  tracks: [],
  oneTrack: null,
  loading: false,
  error: false,
};

const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload: tracks }) => {
        state.loading = false;
        state.tracks = tracks;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectOneTrack: (state) => state.oneTrack,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
  },
});

export const tracksReducer = tracksSlice.reducer;

export const { selectTracks, selectOneTrack, selectLoading, selectError } =
  tracksSlice.selectors;
