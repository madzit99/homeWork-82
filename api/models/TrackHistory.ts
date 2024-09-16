import mongoose, { Types } from "mongoose";
import Artist from "./Artist";
import Track from "./Track";

const Schema = mongoose.Schema;

const TrackHistoryShema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: "Artist does not exist!",
    },
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: "Track",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const track = await Track.findById(value);
        return Boolean(track);
      },
      message: "Track does not exist!",
    },
  },
  datetime: {
    type: Date,
    required: true,
  },
});

const TrackHistory = mongoose.model("TrackHistory", TrackHistoryShema);

export default TrackHistory;