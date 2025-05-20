import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Search from "./Search";
import Watchlist from "./WatchList";

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  function handleWatchlistToggle(movie) {
    if (watchlist.some((mov) => mov.imdbID === movie.imdbID)) {
      setWatchlist(watchlist.filter((mov) => mov.imdbID !== movie.imdbID));
    } else {
      // setWatchlist([...watchlist, movie]);
      setWatchlist((prev) => [...prev, movie]);
    }
  }

  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlistData");
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
    setIsLoaded(true);
  }, []);

  // console.log("The watchlist", watchlist);

  if (!isLoaded) return <p>Loading...</p>;

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
                  handleWatchlistToggle={handleWatchlistToggle}
                />
              }
            />
            <Route
              path="/watchlist"
              element={<Watchlist watchlist={watchlist} />}
            />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
