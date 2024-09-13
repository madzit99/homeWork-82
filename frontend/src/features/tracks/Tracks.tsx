import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Grid } from "@mui/material";
import { selectTracks } from "./TracksSlice";
import { fetchTracks } from "./TrackThunks";
import TracksItem from "./TracksItem";

interface Props {
  trackId: string;
}

const Tracks: React.FC<Props> = ({ trackId }) => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);

  useEffect(() => {
    dispatch(fetchTracks(trackId));
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      {tracks.map((track) => (
        <Grid item key={track._id}>
          <TracksItem tracks={track} />
        </Grid>
      ))}
    </Grid>
  );
};

 
export default Tracks;