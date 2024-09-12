import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { API_URL } from "../../constants.ts";
import imageNotAvailable from "../../assets/image-not-found.png";
import { Album } from "../../type";

interface Props {
  album: Album;
}

const AlbumsItem: React.FC<Props> = ({ album }) => {
  let cardImage = imageNotAvailable;

  if (album.photo) {
    cardImage = API_URL + "/" + album.photo;
  }

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
        />
        <NavLink
          style={{
            textDecoration: "none",
            color: "#fff",
            width: "100%",
          }}
          to={`/albums/${album._id}`}
        >
          <Button variant="contained" sx={{ width: "100%" }}>
            Открыть альбом
          </Button>
        </NavLink>
      </Card>
    </Grid>
  );
};

export default AlbumsItem;
