import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackHistoryShema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  track: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
});

const TrackHistory = mongoose.model("TrackHistory", TrackHistoryShema);

export default TrackHistory;