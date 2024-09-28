import { createAsyncThunk } from "@reduxjs/toolkit";
import { Album, AlbumMutation } from "../../type";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";

export const fetchAlbums = createAsyncThunk<Album[], string | undefined>(
  "albums/fetchAll",
  async (artistId) => {
    const { data: albums } = await axiosApi.get<Album[]>(`/albums`, {
      params: { artist: artistId },
    });
    return albums;
  }
);

export const createNewAlbum = createAsyncThunk<
  void,
  AlbumMutation,
  { state: RootState }
>("albums/create", async (AlbumMutation, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      const formData = new FormData();

      Object.entries(AlbumMutation).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value as string);
        }
      });

      await axiosApi.post("/albums", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (error) {
    console.error(error);
  }
});

export const deleteAlbum = createAsyncThunk<void, string, { state: RootState }>(
  "albums/delete",
  async (albumId: string, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.users.user?.token;

      if (token) {
        await axiosApi.delete(`/albums/${albumId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
);
