import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Search from "./Search";
import Watchlist from "./WatchList";

function App() {
  const [watchlist, setWatchlist] = useState([]);

  function handleAddToWatchlist(movie) {
    if (watchlist.some((mov) => mov.imdbID === movie.imdbID)) {
      setWatchlist(watchlist.filter((mov) => mov.imdbID !== movie.imdbID));
    } else {
      setWatchlist([...watchlist, movie]);
    }
  }
  console.log(watchlist);
  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Search
                  watchlist={watchlist}
                  handleAddToWatchlist={handleAddToWatchlist}
                />
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
