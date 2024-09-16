import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Track } from "../../type";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useSelector } from "react-redux";
import { selectUser } from "../users/usersSlice";
import { sendTrackHistory } from "../trackHistory/trackHistoryThunk";
import { useAppDispatch } from "../../app/hooks";

interface Props {
  track: Track;
}

const TracksItem: React.FC<Props> = ({ track }) => {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();

  const handlePlayTrack = async () => {
    if (user) {
      try {
        await dispatch(sendTrackHistory(track._id));
      } catch (error) {
        throw error;
      }
    }
  };
  return (
    <Grid container alignItems="center" sx={{ mb: "5px" }}>
      <Grid item container justifyContent="center" xs={1}>
        <Typography variant="h5">{track.trackNumber}</Typography>
        {user && (
          <Button onClick={handlePlayTrack}>
            <PlayArrowIcon />
          </Button>
        )}
      </Grid>

      <Grid item xs={6}>
        <Typography variant="h5">{track.name}</Typography>
      </Grid>
      <Grid item xs={1} sx={{ ml: "auto", textAlign: "right" }}>
        <Typography variant="h5">{track.duration}</Typography>
      </Grid>
    </Grid>
  );
};

export default TracksItem;
