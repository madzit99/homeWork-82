import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchArtists } from "./artistsThunks";
import { selectArtists } from "./artistsSlice";
import ArtistItem from "./components/ArtistItem";
import { Grid } from "@mui/material";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);
  return (
    <Grid container spacing={2}>
      {artists.map((artist) => (
        <Grid item key={artist._id}>
          <ArtistItem artist={artist} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Artists;
