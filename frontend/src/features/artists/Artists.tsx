import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchArtists } from "./artistsThunks";
import { selectArtists } from "./artistsSlice";
import ArtistItem from "./components/ArtistItem";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../users/usersSlice";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      {artists.map((artist) => (
        <Grid item key={artist._id}>
          {(artist.isPublished || user?.role === "admin") && (
            <ArtistItem artist={artist} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default Artists;
