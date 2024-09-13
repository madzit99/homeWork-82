import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../../type";
import { fetchTracks } from "./TrackThunks";
import { RootState } from "../../app/store";

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
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectOneTrack = (state: RootState) => state.tracks.oneTrack;
export const selectLoading = (state: RootState) => state.tracks.loading;
export const selectError = (state: RootState) => state.tracks.error;
