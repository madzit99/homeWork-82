import mongoose, { Schema } from "mongoose";

const artistShema = new mongoose.Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  information: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Artist = mongoose.model("Artist", artistShema);

export default Artist