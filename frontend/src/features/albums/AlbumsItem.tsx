import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants.ts";
import imageNotAvailable from "../../assets/image-not-found.png";
import { Album } from "../../type";
import {
  deleteAlbum,
  fetchAlbums,
  togglePublishedAlbums,
} from "./albumsThunks.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../users/usersSlice.ts";

interface Props {
  album: Album;
  artistId: string;
}

const AlbumsItem: React.FC<Props> = ({ album, artistId }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let cardImage = imageNotAvailable;

  if (album.photo) {
    cardImage = API_URL + "/" + album.photo;
  }
  const handleDelete = async () => {
    if (album) {
      await dispatch(deleteAlbum(album?._id));
      navigate("/");
    }
  };

  const handleToggle = async () => {
    await dispatch(togglePublishedAlbums(album ? album._id : ""));
    await dispatch(fetchAlbums(artistId));
  };

  return (
    <Grid item>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardHeader
          sx={{ paddingBottom: "0" }}
          title={
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              {album.name}
            </Typography>
          }
        />
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {album.year}
        </Typography>
        <CardMedia
          component="img"
          sx={{
            display: "block",
            width: "100%",
            height: "auto",
            maxHeight: "500px",
            mx: "auto",
          }}
          image={cardImage}
        />{" "}
        {!album.isPublished ? (
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
          to={`/albums/${album._id}`}
        >
          <Button variant="contained" sx={{ width: "100%", marginTop: "10px" }}>
            Открыть альбом
          </Button>
        </NavLink>
        {user && user.role === "admin" && (
          <Button
            variant="contained"
            sx={{ width: "100%", marginTop: "10px" }}
            onClick={handleDelete}
          >
            Удалить альбом
          </Button>
        )}
        {!album.isPublished && (
          <Button
            variant="contained"
            sx={{ width: "100%", marginTop: "10px" }}
            onClick={handleToggle}
          >
            Опубликовать альбом
          </Button>
        )}
      </Card>
    </Grid>
  );
};

export default AlbumsItem;
