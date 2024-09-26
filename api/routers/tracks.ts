import { Router } from "express";
import Album from "../models/Album";
import Track from "../models/Track";
import mongoose from "mongoose";
import permit from "../middleware/permit";
import auth, { RequestWithUser } from "../middleware/auth";

const TrackRouter = Router();

TrackRouter.get("/", async (req, res, next) => {
  try {
    const albumId = req.query.album;

    const tracks = albumId
      ? await Track.find({ album: albumId }).sort({ trackNumber: 1 })
      : await Track.find();

    return res.send(tracks);
  } catch (error) {
    return next(error);
  }
});

TrackRouter.post("/", permit("admin"), async (req, res, next) => {
  try {
    const track = await Track.create({
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
    });

    return res.send(track);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});



TrackRouter.delete(
  "/:id",
  auth,
  permit("admin"),
  async (req: RequestWithUser, res, next) => {
    try {
      const trackId = req.params.id;
      const track = await Track.findById(trackId);
      if (!track) {
        return res.status(404).send({ error: "Трек не найден." });
      }
      
      await Track.findByIdAndDelete(trackId);
      return res.send({ message: "Трек удален" });
    } catch (error) {
      next(error);
    }
  }
);

export default TrackRouter;
