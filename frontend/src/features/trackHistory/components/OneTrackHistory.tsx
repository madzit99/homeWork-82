import { Grid, Typography } from "@mui/material";
import { Artist, Track } from "../../../type";
import dayjs from "dayjs";

interface Props {
  track: Track;
  date: Date;
  artist: Artist;
}

const OneTrackHistory: React.FC<Props> = ({ track, date, artist }) => {
  const dateFormat = dayjs(date).format("DD/MM/YYYY HH:mm:ss");

  return (
    <>
      <Grid item container>
        <Typography variant="h5" sx={{ mr: "20px", fontWeight: "bold" }}>
          {artist.name}
        </Typography>
        <Typography sx={{ fontWeight: "bold" }}>-</Typography>
        <Typography variant="h5" sx={{ ml: "20px" }}>
          {track.name}
        </Typography>
        <Typography variant="h5" sx={{ display: "block", ml: "auto" }}>
          {dateFormat}
        </Typography>
      </Grid>
    </>
  );
};

export default OneTrackHistory;
