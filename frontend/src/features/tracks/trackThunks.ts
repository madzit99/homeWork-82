import { createAsyncThunk } from "@reduxjs/toolkit";
import { Track } from "../../type";
import axiosApi from "../../axiosApi";

export const fetchTracks = createAsyncThunk<Track[], string | undefined>(
  "tracks/fetchAll",
  async (trackId) => {
    const { data: tracks } = await axiosApi.get<Track[]>(`/tracks`, {
      params: { tracks: trackId },
    });
    return tracks;
  }
);
