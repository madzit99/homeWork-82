import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createNewArtist } from "../artistsThunks";
import { selectUser } from "../../users/usersSlice";
import ArtistForm from "./ArtistForm";
import { ArtistMutation } from "../../../type";

// interface ArtistMutation {
//   name: string;
//   info: string;
//   photo: File | null;
// }

const CreateNewArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  const onFormSubmit = async (ArtistMutation: ArtistMutation) => {
    try {
      await dispatch(createNewArtist(ArtistMutation)).unwrap();

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
      <Typography variant="h4" sx={{textAlign: "center"}} >Опубликовать нового артиста</Typography>
      <ArtistForm onSubmit={onFormSubmit} />
    </Container>
    
  );
};
export default CreateNewArtist;
