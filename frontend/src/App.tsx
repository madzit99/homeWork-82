import { Route, Routes } from "react-router-dom";
import AppToolbar from "./UI/AppToolbar/AppToolbar";
import Artists from "./features/artists/Artists";
import OneArtist from "./features/artists/OneArtist";
import Tracks from "./features/tracks/Tracks";
import { Typography } from "@mui/material";
import Register from "./features/users/Register";
import Login from "./features/users/Login";

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
          <Route path="/albums/:id" element={<Tracks />} />
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
