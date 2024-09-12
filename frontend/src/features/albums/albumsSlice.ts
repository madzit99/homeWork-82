import { createSlice } from "@reduxjs/toolkit";
import { Album } from "../../type";
import { fetchAlbums } from "./albumsThunks";

export interface AlbumsState {
    albums: Album[],
    oneAlbum: Album | null,
    loading: boolean,
    error: boolean,
}

const initialState: AlbumsState = {
    albums: [],
    oneAlbum: null,
    loading: false,
    error: false,
}

export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload: albums }) => {
        state.loading = false;
        state.albums = albums;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
  selectors: {
    selectAlbums: (state) => state.albums,
    selectOneAlbum: (state) => state.oneAlbum,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
  },
});


export const albumsReducer = albumsSlice.reducer;

export const { selectAlbums, selectOneAlbum, selectLoading, selectError } =
  albumsSlice.selectors;
