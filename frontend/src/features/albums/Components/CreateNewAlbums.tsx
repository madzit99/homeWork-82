import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../users/usersSlice";
import { useEffect } from "react";
import { createNewAlbum } from "../albumsThunks";
import { Container, Typography } from "@mui/material";
import AlbumForm from "./AlbumForm";
import { AlbumMutation } from "../../../type";


const CreateNewAlbums = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  const onFormSubmit = async (AlbumMutation: AlbumMutation) => {
    try {
      await dispatch(createNewAlbum(AlbumMutation)).unwrap();

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container
      sx={{
        bgcolor: "#fff",
        pt: "30px",
        pb: "30px",
        border: "3px solid black",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Создать новый альбом
      </Typography>
      <AlbumForm onSubmit={onFormSubmit} />
    </Container>
  );
};
export default CreateNewAlbums;
