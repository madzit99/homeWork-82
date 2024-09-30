import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import imageNotFound from "../../../assets/image-not-found.png";
import { Artist } from "../../../type";
import { API_URL } from "../../../constants";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../users/usersSlice";
import {
  deleteArtist,
  fetchArtists,
  togglePublishedArtist,
} from "../artistsThunks";

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: "56.25%",
});

interface Props {
  artist: Artist;
}

const ProductItem: React.FC<Props> = ({ artist }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  let cardImage = imageNotFound;

  if (artist.photo) {
    cardImage = `${API_URL}/${artist.photo}`;
  }

  const handleDelete = async () => {
    if (artist) {
      await dispatch(deleteArtist(artist?._id));
      await dispatch(fetchArtists());
    }
  };

  const handleToggle = async () => {
    await dispatch(togglePublishedArtist(artist ? artist._id : ""));
    await dispatch(fetchArtists());
  };

  return (
    <Grid item sx={{ width: "300px" }}>
      <Card sx={{ height: "100%" }}>
        <CardHeader title={artist.name} />
        <ImageCardMedia image={cardImage} title={artist.name} />
        {!artist.isPublished ? (
          <Typography variant="h5" color="red" sx={{ textAlign: "center" }}>
            Не опубликован
          </Typography>
        ) : (
          ""
        )}
        <NavLink
          style={{
            textDecoration: "none",
            color: "#fff",
            width: "100%",
          }}
          to={`/artists/${artist._id}`}
        >
          <Button variant="contained" sx={{ width: "100%", marginTop: "10px" }}>
            Показать артиста
          </Button>
        </NavLink>
        {user && user.role === "admin" && (
          <Button
            variant="contained"
            sx={{ width: "100%", marginTop: "10px" }}
            onClick={handleDelete}
          >
            Удалить артиста
          </Button>
        )}
        {!artist.isPublished && (
          <Button
            variant="contained"
            sx={{ width: "100%", marginTop: "10px" }}
            onClick={handleToggle}
          >
            Опубликовать артиста
          </Button>
        )}
      </Card>
    </Grid>
  );
};

export default ProductItem;
