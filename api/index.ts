import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config";
import ArtistsRouter from "./routers/artists";
import AlbumsRouter from "./routers/albums";
import TrackRouter from "./routers/tracks";
import usersRouter from "./routers/users";
import TrackHistoryRouter from "./routers/trackHistory";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use("/artists", ArtistsRouter);
app.use("/albums", AlbumsRouter);
app.use("/tracks", TrackRouter);
app.use("/users", usersRouter);
app.use("/trackHistory", TrackHistoryRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
