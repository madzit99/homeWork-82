import { Router } from "express";
import Album from "../models/Album";
import mongoose from "mongoose";
import { imagesUpload } from "../multer";

const AlbumsRouter = Router();

AlbumsRouter.get("/", async (req, res, next) => {
  try {
    let albums;

    if (req.query.artist) {
      albums = await Album.find({ artist: req.query.artist });
    } else {
      albums = await Album.find();
    }

    return res.send(albums);
  } catch (error) {
    return next(error);
  }
});

AlbumsRouter.get("/:id", async (req, res, next) => {
    try{
        const album = await Album.findById(req.params.id).populate("artist");
        return res.send(album);
    }catch (error) {
        return next(error);
    }
} )


AlbumsRouter.post(
  "/",
  imagesUpload.single("photo"),
  async (req, res, next) => {
    try {
      const albumData = {
        name: req.body.name,
        year: req.body.year,
        artist: req.body.artist,
        photo: req.file ? req.file.filename : null,
      };

      const album = new Album(albumData);
      await album.save();

      return res.send(album);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(error);
      }

      return next(error);
    }
  }
);

export default AlbumsRouter;