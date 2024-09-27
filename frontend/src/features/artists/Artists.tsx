import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchArtists } from "./artistsThunks";
import { selectArtists } from "./artistsSlice";
import ArtistItem from "./components/ArtistItem";
import { Grid } from "@mui/material";
// import { selectUser } from "../users/usersSlice";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  // const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      {artists.map(
        (artist) =>
          // (artist.isPublished || (user && user.role === "admin")) && (
            <Grid item key={artist._id}>
              <ArtistItem artist={artist} />
            </Grid>
          // )
      )}
    </Grid>
  );
};

export default Artists;
