import { Route, Routes } from "react-router-dom";
import AppToolbar from "./UI/AppToolbar/AppToolbar";
import Artists from "./features/artists/Artists";

const App = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Artists />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
