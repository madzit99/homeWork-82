import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  Grid,
  styled,
} from "@mui/material";
import imageNotFound from "../../../assets/image-not-found.png";
import { Artist } from "../../../type";
import { API_URL } from "../../../constants";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../users/usersSlice";
import { deleteArtist } from "../artistsThunks";

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: "56.25%",
});

interface Props {
  artist: Artist;
}

const ProductItem: React.FC<Props> = ({ artist }) => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let cardImage = imageNotFound;

  if (artist.photo) {
    cardImage = `${API_URL}/${artist.photo}`;
  }

   const handleDelete = async () => {
     if (artist) {
       await dispatch(deleteArtist(artist?._id));
       navigate("/");
     }
   };

  return (
    <Grid item sx={{ width: "300px" }}>
      <Card sx={{ height: "100%" }}>
        <CardHeader title={artist.name} />
        <ImageCardMedia image={cardImage} title={artist.name} />
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
      </Card>
    </Grid>
  );
};

export default ProductItem;
