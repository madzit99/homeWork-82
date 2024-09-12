import { createAsyncThunk } from "@reduxjs/toolkit";
import { Album } from "../../type";
import axiosApi from "../../axiosApi";

export const fetchAlbums = createAsyncThunk<Album[], string | undefined>(
  "albums/fetchAll",
  async (artistId) => {
    const { data: albums } = await axiosApi.get<Album[]>(`/albums`, {
      params: { artist: artistId },
    });
    return albums;
  }
);
