import { Router } from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";
import auth, { RequestWithUser } from "../middleware/auth";
import Album from "../models/Album";
import Artist from "../models/Artist";
import Track from "../models/Track";

const TrackHistoryRouter = Router();

TrackHistoryRouter.get("/", auth, async (req: RequestWithUser, res, next) => {
  try {
    const results = await TrackHistory.find({ user: req.user?._id })
      .populate("track", "name")
      .populate("artist", "name")
      .sort({ datetime: -1 });
    return res.send(results);
  } catch (error) {
    return next(error);
  }
});

TrackHistoryRouter.post("/", auth, async (req: RequestWithUser, res, next) => {
  try {
    const userId = req.user?._id;

    const trackId = req.body.track;

    if (!trackId) {
      return res.status(400).send({ error: "Track ID нужно передать" });
    }

    const track = await Track.findById(trackId);
    if (!track) {
      return res.status(404).send({ error: "No such track!" });
    }
    
    const album = await Album.findById(track.album);
    if (!album) {
      return res.status(404).send({ error: "No such album!" });
    }

    const artist = await Artist.findById(album.artist);
    if (!artist) {
      return res.status(404).send({ error: "No such artist!" });
    }

    const trackHistory = new TrackHistory({
      user: userId,
      track: req.body.track,
      datetime: new Date(),
      artist: artist._id,
    });

    await trackHistory.save();
    return res.send(trackHistory);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }
    next(error);
  }
});

export default TrackHistoryRouter;
