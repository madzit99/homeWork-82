import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Track } from "../../type";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useSelector } from "react-redux";
import { selectUser } from "../users/usersSlice";
import { sendTrackHistory } from "../trackHistory/trackHistoryThunk";
import { useAppDispatch } from "../../app/hooks";
import { deleteTrack, fetchTracks, togglePublishedTrack } from "./trackThunks";

interface Props {
  track: Track;
  id: string;
}

const TracksItem: React.FC<Props> = ({ track, id }) => {
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

  const handleDelete = async () => {
    if (track) {
      await dispatch(deleteTrack(track?._id));
    }
    if (track.album) {
      await dispatch(fetchTracks(track.album));
    }
  };

  const handleToggle = async () => {
    await dispatch(togglePublishedTrack(track ? track._id : ""));
    await dispatch(fetchTracks(id));
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
      <Grid item xs={4}>
        <Typography variant="h5">{track.name}</Typography>
      </Grid>
      <Grid item xs={1} sx={{ ml: "auto", textAlign: "right" }}>
        <Typography variant="h5">{track.duration}</Typography>
      </Grid>
      {!track.isPublished ? (
        <Grid item xs={1} sx={{ ml: "auto", textAlign: "right" }}>
          <Typography variant="h5" color="red" sx={{ textAlign: "center" }}>
            Трек не опубликован
          </Typography>
        </Grid>
      ) : (
        ""
      )}
      {user && user.role === "admin" && (
        <Grid item xs={1} sx={{ ml: "auto", textAlign: "right" }}>
          <Button
            variant="contained"
            sx={{ maxWidth: "80%", marginTop: "20px" }}
            onClick={handleDelete}
          >
            Удалить трек
          </Button>
        </Grid>
      )}
      {!track.isPublished && (
        <Grid item xs={1} sx={{ ml: "auto", textAlign: "right" }}>
          <Button
            variant="contained"
            sx={{ width: "100%", marginTop: "20px" }}
            onClick={handleToggle}
          >
            Опубликовать трек
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default TracksItem;
