import React, { useEffect, useState } from "react";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectArtists } from "../../artists/artistsSlice";
import { fetchAlbums } from "../../albums/albumsThunks";
import { selectAlbums } from "../../albums/albumsSlice";
import { TrackMutation } from "../../../type";
import { fetchArtists } from "../../artists/artistsThunks";

interface Props {
  onSubmit: (mutation: TrackMutation) => void;
}
const TrackForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);

  const [state, setState] = useState<TrackMutation>({
    name: "",
    duration: "",
    trackNumber: 1,
    album: "",
    artist: "",
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  useEffect(() => {
    if (state.artist) {
      dispatch(fetchAlbums(state.artist));
    }
  }, [dispatch, state.artist]);

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="name"
            label="Название трека"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            select
            id="artist"
            label="Выберите артиста"
            value={state.artist}
            onChange={inputChangeHandler}
            name="artist"
            required
          >
            {artists.map((artist) => (
              <MenuItem key={artist?._id} value={artist._id}>
                {artist.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            select
            id="album"
            label=" Выберите альбом"
            value={state.album}
            onChange={inputChangeHandler}
            name="album"
            required
          >
            {albums.map((album) => (
              <MenuItem key={album?._id} value={album._id}>
                {album.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            id="duration"
            label="продолжительность трека"
            value={state.duration}
            onChange={inputChangeHandler}
            name="duration"
            required
          />
        </Grid>
        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">
            Создать
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default TrackForm;
