import React from "react";
import {
  Grid,
  Typography,
} from "@mui/material";
import { Track } from "../../type";

interface Props {
  track: Track;
}

const TracksItem: React.FC<Props> = ({ track }) => {

  return (
    <Grid container alignItems="center" sx={{ mb: "5px" }}>
      <Grid item container justifyContent="center" xs={1}>
        <Typography variant="h5">{track.trackNumber}</Typography>
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
