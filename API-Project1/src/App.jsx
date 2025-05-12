import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Search from "./Search";
import Watchlist from "./Watchlist";

function App() {
  const [watchlist, setWatchlist] = useState([]);

  function handleOnClick(movie) {
    setWatchlist([...watchlist, movie]);
  }

  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Search watchlist={watchlist} handleOnClick={handleOnClick} />
              }
            />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
