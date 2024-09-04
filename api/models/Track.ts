import mongoose, { Schema, Types } from "mongoose";
import Album from "./Album";
const trackShema = new mongoose.Schema({
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
  }
});

const Track = mongoose.model("Track", trackShema);

export default Track;
