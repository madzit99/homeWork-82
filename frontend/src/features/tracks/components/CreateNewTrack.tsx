import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../users/usersSlice";
import { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { createTrack } from "../trackThunks";
import TrackForm from "./TrackForm";
import { TrackMutation } from "../../../type";


const CreateNewTrack = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  const onFormSubmit = async (TrackMutation: TrackMutation) => {
    try {
      await dispatch(createTrack(TrackMutation)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
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
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "10px"}}>
        Создать новый трек
      </Typography>
      <TrackForm onSubmit={onFormSubmit} />
    </Container>
  );
};

export default CreateNewTrack;
