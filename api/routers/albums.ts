import { Router } from "express";
import Album from "../models/Album";
import mongoose from "mongoose";
import { imagesUpload } from "../multer";
import permit from "../middleware/permit";
import auth, { RequestWithUser } from "../middleware/auth";
import Artist from "../models/Artist";

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
  try {
    const album = await Album.findById(req.params.id).populate("artist");
    return res.send(album);
  } catch (error) {
    return next(error);
  }
});

AlbumsRouter.post(
  "/", auth, 
  imagesUpload.single("photo"),
  async (req: RequestWithUser, res, next) => {
    try {
      const album = await Album.create({
        user: req.user?._id,
        name: req.body.name,
        year: req.body.year,
        artist: req.body.artist,
        photo: req.file ? req.file.filename : null,
      });

      return res.send(album);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(error);
      }

      return next(error);
    }
  }
);

AlbumsRouter.delete(
  "/:id",
  auth,
  permit("admin"),
  async (req: RequestWithUser, res, next) => {
    try {
      const albumId = req.params.id;
      const album = await Album.findById(albumId);
      if (!album) {
        return res.status(404).send({ error: "Альбом не найден." });
      }

      await Artist.findByIdAndDelete(albumId);
      return res.send({ message: "Альбом удален" });
    } catch (error) {
      next(error);
    }
  }
);

AlbumsRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req: RequestWithUser, res, next) => {
    try {
      const albumId = req.params.id;
      const album = await Album.findById(albumId);

      if (!album) {
        return res.status(404).send({ message: "Альбом не найден" });
      }

      album.isPublished = !album.isPublished;
      album.save();

      return res.send(album);
    } catch (error) {
      next(error);
    }
  }
);

export default AlbumsRouter;
