import React from "react";
import {
  Grid,
  Typography,
} from "@mui/material";
import { Track } from "../../type";

interface Props {
  tracks: Track;
}

const TracksItem: React.FC<Props> = ({ tracks }) => {

  return (
    <Grid container alignItems="center" sx={{ mb: "5px" }}>
      <Grid item container justifyContent="center" xs={1}>
        <Typography variant="h5">{tracks.trackNumber}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant="h5">{tracks.name}</Typography>
      </Grid>
      <Grid item xs={1} sx={{ ml: "auto", textAlign: "right" }}>
        <Typography variant="h5">{tracks.duration}</Typography>
      </Grid>
    </Grid>
  );
};

export default TracksItem;
