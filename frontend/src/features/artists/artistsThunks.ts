import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Artist } from "../../type";

export const fetchArtists = createAsyncThunk("artists/fetchAll", async () => {
  const { data: artists } = await axiosApi.get<Artist[]>("/artists");
  return artists;
});
