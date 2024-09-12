import mongoose, { Schema, Types } from "mongoose";
import Artist from "./Artist";

const albumShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
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
      message: "Artist does not exist",
    },
  },
  year: {
    type: Number,
    required: true,
  }
});

const Album = mongoose.model("Album", albumShema);

export default Album;
