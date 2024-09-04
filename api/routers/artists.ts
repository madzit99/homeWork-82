import { Router } from "express";
import Artist from "../models/Artist";
import { imagesUpload } from "../multer";
import mongoose from "mongoose";

const ArtistsRouter = Router();

ArtistsRouter.get("/", async (req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (error) {
    return next(error);
  }
});

ArtistsRouter.post(
  "/",
  imagesUpload.single("photo"),
  async (req, res, next) => {
    try {
      const artistData = {
        name: req.body.name,
        information: req.body.information,
        photo: req.file ? req.file.filename : null,
      };

      const artist = new Artist(artistData);
      await artist.save();

      return res.send(artist);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(error);
      }

      return next(error);
    }
  }
);

export default ArtistsRouter;