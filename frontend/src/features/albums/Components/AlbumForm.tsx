import React, { useEffect, useState } from "react";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchArtists } from "../../artists/artistsThunks";
import { AlbumMutation } from "../../../type";
import FileInput from "../../../UI/FileInput/FileInput";
import { selectArtists } from "../../artists/artistsSlice";
interface Props {
  onSubmit: (mutation: AlbumMutation) => void;
}
const AlbumForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const [state, setState] = useState<AlbumMutation>({
    name: "",
    photo: null,
    year: 2024,
    artist: "",
  });

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

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="name"
            label="Название альбома"
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
            label="Артист"
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
            type="number"
            id="year"
            label="Дата"
            value={state.year}
            onChange={inputChangeHandler}
            name="year"
            required
          />
        </Grid>
        <Grid item xs>
          <FileInput
            label="Изображение"
            name="photo"
            onChange={fileInputChangeHandler}
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
export default AlbumForm;
