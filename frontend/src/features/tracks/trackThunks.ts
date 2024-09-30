import { createAsyncThunk } from "@reduxjs/toolkit";
import { Track, TrackMutation } from "../../type";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";

export const fetchTracks = createAsyncThunk<Track[], string | undefined>(
  "tracks/fetchAll",
  async (albumId) => {
    const { data: tracks } = await axiosApi.get<Track[]>(`/tracks`, {
      params: { album: albumId },
    });
    return tracks;
  }
);

export const createTrack = createAsyncThunk<void, TrackMutation, { state: RootState }>(
  "tracks/create",
  async (trackMutation, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.users.user?.token;
      
      if (token) {
        await axiosApi.post("/tracks", trackMutation, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
);

export const deleteTrack = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("track/delete", async (trackId: string, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      await axiosApi.delete(`/tracks/${trackId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (error) {
    console.error(error);
  }
});

export const togglePublishedTrack = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("tracks/toggle", async (trackId) => {
  try {
    await axiosApi.patch(`/tracks/${trackId}/togglePublished`);
  } catch (e) {
    console.error(e);
  }
});

