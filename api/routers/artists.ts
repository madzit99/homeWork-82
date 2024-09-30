import { Router } from "express";
import Artist from "../models/Artist";
import { imagesUpload } from "../multer";
import mongoose from "mongoose";
import permit from "../middleware/permit";
import auth, { RequestWithUser } from "../middleware/auth";

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
  "/",auth,
  imagesUpload.single("photo"),
  async (req: RequestWithUser, res, next) => {
    try {
      const artist = await Artist.create({
        user: req.user?._id,
        name: req.body.name,
        information: req.body.information,
        photo: req.file ? req.file.filename : null,
      });

      return res.send(artist);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(error);
      }

      return next(error);
    }
  }
);

ArtistsRouter.delete(
  "/:id",
  auth,
  permit("admin"),
  async (req: RequestWithUser, res, next) => {
    try {
      const artistId = req.params.id; 
      const artist = await Artist.findById(artistId); 
      if (!artist) {
        return res.status(404).send({ error: "Артист не найден!" });
      }
      await Artist.findByIdAndDelete(artistId);
      return res.send({ message: "Артист удален." });
    } catch (error) {
      next(error);
    }
  }
);

ArtistsRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req: RequestWithUser, res, next) => {
    try {
      const artistId = req.params.id;
      const artist = await Artist.findById(artistId);

      if (!artist) {
        return res.status(404).send({ message: "Артист не найден" });
      }

      artist.isPublished = !artist.isPublished;
      artist.save();

      return res.send(artist);
    } catch (error) {
      next(error);
    }
  }
);

export default ArtistsRouter;
