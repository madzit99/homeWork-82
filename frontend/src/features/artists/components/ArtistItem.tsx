import React from "react";
import { Card, CardHeader, CardMedia, Grid, styled } from "@mui/material";
import imageNotFound from "../../../assets/image-not-found.png";
import { Artist } from "../../../type";
import { API_URL } from "../../../constants";

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: "56.25%",
});

interface Props {
  artist: Artist;
}

const ProductItem: React.FC<Props> = ({ artist }) => {
  let cardImage = imageNotFound;

  if (artist.photo) {
    cardImage = `${API_URL}/${artist.photo}`;
  }

  return (
    <Grid item sx={{ width: "300px" }}>
      <Card sx={{ height: "100%" }}>
        <CardHeader title={artist.name} />
        <ImageCardMedia image={cardImage} title={artist.name} />
      </Card>
    </Grid>
  );
};

export default ProductItem;
