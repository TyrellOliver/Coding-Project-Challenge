import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Search from "./Search";
import Watchlist from "./WatchList";

function App() {
  const [movies, setMovies] = useState([]);
  const savedWatchlist = localStorage.getItem("watchlistData");
  const parsedWatchlist = savedWatchlist ? JSON.parse(savedWatchlist) : [];
  const [watchlist, setWatchlist] = useState(parsedWatchlist);
  // const [isLoaded, setIsLoaded] = useState(false);

  function handleMoviesSearch(data) {
    setMovies(data);
  }

  function handleWatchlistToggle(movie) {
    let newWatchlist = [];

    if (watchlist.some((mov) => mov.imdbID === movie.imdbID)) {
      newWatchlist = watchlist.filter((mov) => mov.imdbID !== movie.imdbID);
      setWatchlist(newWatchlist);
    } else {
      newWatchlist = [...watchlist, movie];
      // setWatchlist([...watchlist, movie]);
      setWatchlist(newWatchlist);
    }
    localStorage.setItem("watchlistData", JSON.stringify(newWatchlist));
  }

  // useEffect(() => {
  //   const savedWatchlist = localStorage.getItem("watchlistData");
  //   if (savedWatchlist) {
  //     setWatchlist(JSON.parse(savedWatchlist));
  //   }
  //   // setIsLoaded(true);
  // }, []);

  // console.log("The watchlist", watchlist);

  // if (!isLoaded) return <p>Loading...</p>;

  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Search
                  movies={movies}
                  handleMoviesSearch={handleMoviesSearch}
                  watchlist={watchlist}
                  handleWatchlistToggle={handleWatchlistToggle}
                />
              }
            />
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  watchlist={watchlist}
                  handleWatchlistToggle={handleWatchlistToggle}
                />
              }
            />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
