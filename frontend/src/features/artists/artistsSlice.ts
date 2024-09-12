import { createSlice } from "@reduxjs/toolkit";
import { Artist } from "../../type";
import { fetchArtists } from "./artistsThunks";

export interface ArtistsState {
  artists: Artist[];
  oneArtist: Artist | null;
  loading: boolean;
  error: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  oneArtist: null,
  loading: false,
  error: false,
};

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
        state.loading = false;
        state.artists = artists;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectOneArtist: (state) => state.oneArtist,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
  },
});

export const artistsReducer = artistsSlice.reducer;

export const { selectArtists, selectOneArtist, selectLoading, selectError } =
  artistsSlice.selectors;
