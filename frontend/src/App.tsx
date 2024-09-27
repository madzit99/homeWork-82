import { Route, Routes } from "react-router-dom";
import AppToolbar from "./UI/AppToolbar/AppToolbar";
import Artists from "./features/artists/Artists";
import OneArtist from "./features/artists/OneArtist";
import Tracks from "./features/tracks/Tracks";
import { Typography } from "@mui/material";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import TrackHistory from "./features/trackHistory/trackHistory";
import CreateArtist from "./features/artists/components/CreateArtist";
import CreateNewAlbums from "./features/albums/Components/CreateNewAlbums";
import CreateNewTrack from "./features/tracks/components/CreateNewTrack";

const App = () => {

  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Artists />} />
          <Route path="/artists/:id" element={<OneArtist />} />
          <Route path="/trackHistory" element={<TrackHistory />} />
          <Route path="/albums/:id" element={<Tracks />} />{" "}
          <Route path="/artists/create" element={<CreateArtist />} />
          <Route path="/albums/create" element={<CreateNewAlbums />} />
          <Route path="/tracks/create" element={<CreateNewTrack />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={<Typography variant="h1">Not found</Typography>}
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
