import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAlbums } from "./albumsSlice";
import { fetchAlbums } from "./albumsThunks";
import { Grid } from "@mui/material";
import AlbumsItem from "./AlbumsItem";

interface Props {
  artistId: string;
}

const Albums: React.FC<Props> = ({ artistId }) => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);

  useEffect(() => {
    if (artistId) {
      dispatch(fetchAlbums(artistId));
    }
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      {albums.map((album) => (
        <Grid item xs={4} key={album._id}>
          <AlbumsItem album={album} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Albums;
