import mongoose from "mongoose";

const artistShema = new mongoose.Schema({
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
});

const Artist = mongoose.model("Artist", artistShema);

export default Artist