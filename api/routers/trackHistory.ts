import { Router } from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";

const TrackHistoryRouter = Router();

TrackHistoryRouter.post("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ error: "No token present" });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).send({ error: "No such user " });
    }

    const trackHistory = new TrackHistory({
      user: user._id,
      track: req.body.track,
      datetime: new Date(),
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