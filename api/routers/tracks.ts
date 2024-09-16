import { Router } from "express";
import Album from "../models/Album";
import Track from "../models/Track";
import mongoose from "mongoose";

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

TrackRouter.post("/", async (req, res, next) => {
  try {
    const trackData = {
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
    };
    const track = new Track(trackData);
    await track.save();

    return res.send(track);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

export default TrackRouter;
