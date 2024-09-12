import { Route, Routes } from "react-router-dom";
import AppToolbar from "./UI/AppToolbar/AppToolbar";
import Artists from "./features/artists/Artists";
import OneArtist from "./features/artists/OneArtist";

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
        </Routes>
      </main>
    </>
  );
};

export default App;
