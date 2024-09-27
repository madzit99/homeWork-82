import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Grid } from "@mui/material";
import TracksItem from "./TracksItem";
import { selectTracks } from "./tracksSlice";
import { fetchTracks } from "./trackThunks";
import { useParams } from "react-router-dom";
// import { selectUser } from "../users/usersSlice";

const Tracks: React.FC = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  // const user = useAppSelector(selectUser);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchTracks(id));
    }
  }, [dispatch, id]);

  return (
    <Grid container spacing={2}>
      {tracks.map(
        (track) =>
          // (track.isPublished || (user && user.role === "admin")) && (
            <Grid item xs={12} key={track._id}>
              <TracksItem track={track} />
            </Grid>
          // )
      )}
    </Grid>
  );
};

export default Tracks;
