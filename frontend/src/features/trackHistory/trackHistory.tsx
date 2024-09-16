import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchHistory } from "./trackHistoryThunk";
import { selectUser } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectHistory } from "./trackHistorySlice";
import OneTrackHistory from "./components/OneTrackHistory";

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const history = useSelector(selectHistory);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    dispatch(fetchHistory());
  }, [dispatch]);

  return (
    <Grid container justifyContent="center">
      {history && history.length > 0 ? (
        <>
          <Typography variant="h3">Your track history</Typography>
          {history.map((historyItem) => (
            <OneTrackHistory
              key={Math.random()}
              track={historyItem.track}
              artist={historyItem.artist}
              date={historyItem.datetime}
            />
          ))}
        </>
      ) : (
        <Typography
          variant="h1"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          No history yet
        </Typography>
      )}
    </Grid>
  );
};

export default TrackHistory;
