import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Artist, ArtistMutation } from "../../type";
import { RootState } from "../../app/store";

export const fetchArtists = createAsyncThunk("artists/fetchAll", async () => {
  const { data: artists } = await axiosApi.get<Artist[]>("/artists");
  return artists;
});

export const createNewArtist = createAsyncThunk<
  void,
  ArtistMutation,
  { state: RootState }
>("artists/create", async (ArtistMutation, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      const formData = new FormData();

      Object.entries(ArtistMutation).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value as string);
        }
      });

      await axiosApi.post("/artists", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (error) {
    console.error(error);
  }
});

export const deleteArtist = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("artists/delete", async (artistId: string, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      await axiosApi.delete(`/artists/${artistId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (error) {
    console.error(error);
  }
});

export const togglePublishedArtist = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("artists/toggle", async (artistId) => {
  try {
    await axiosApi.patch(`/artists/${artistId}/togglePublished`);
  } catch (e) {
    console.error(e);
  }
});
