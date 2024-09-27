import { useState } from "react";
import { ArtistMutation } from "../../../type";
import { Button, Grid, TextField } from "@mui/material";
import FileInput from "../../../UI/FileInput/FileInput";

interface Props {
  onSubmit: (mutation: ArtistMutation) => void;
}

const ArtistForm: React.FC<Props> = ({ onSubmit }) => {
  const [state, setState] = useState<ArtistMutation>({
    name: "",
    info: "",
    photo: null,
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.photo) {
      alert("Загрузите пожалуйста фото Артиста!");
      return;
    }
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
    <form autoComplete="off" onSubmit={submitFormHandler} >
      <Grid sx={{ mb: 2, mt: 2 }}>
        <Grid item >
          <TextField
            id="name"
            label="Имя Артиста"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
            required
          />
        </Grid>
      </Grid>

      <Grid sx={{ mb: 2 }}>
        <Grid item >
          <TextField
            multiline
            rows={3}
            id="info"
            label="Информация"
            value={state.info}
            onChange={inputChangeHandler}
            name="info"
            required
          />
        </Grid>
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <FileInput
          label="Фото Артиста"
          name="photo"
          onChange={fileInputChangeHandler}
        />
      </Grid>

      <Grid sx={{ mb: 2 }}>
        <Grid item>
          <Button type="submit" color="primary" variant="contained">
            Создать
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ArtistForm;
