import mongoose, { Schema, Types } from "mongoose";
import Album from "./Album";
const trackShema = new mongoose.Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const album = await Album.findById(value);
        return Boolean(album);
      },
      message: "Album does not exist",
    },
  },
  duration: {
    type: String,
  },
  trackNumber: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Track = mongoose.model("Track", trackShema);

export default Track;
