import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_KEY;
const type = "movie";
const SEARCH_TERM_TO_CHANGE_LATER = "batman";

const Search = ({ watchlist, handleAddToWatchlist }) => {
  const [movies, setMovies] = useState([]);

  const fetchData = () => {
    try {
      fetch(
        `http://www.omdbapi.com/?apikey=${API}&s=${SEARCH_TERM_TO_CHANGE_LATER}&type=${type}`
      )
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data.Search);
          setMovies(data.Search);
        });
    } catch (error) {
      console.log("Error fetching movies", error);
      return error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="search">
      <h1>Movies</h1>
      <h2>{watchlist.length}</h2>
      <Link to={"/watchlist"}>
        <button>My Watchlist</button>
      </Link>
      {movies.map((movie) => (
        <div key={movie.imdbID}>
          {/* {console.log(movie)} */}
          <h3>{movie.Title}</h3>
          <button
            onClick={() => {
              handleAddToWatchlist(movie);
            }}
          >
            {watchlist.some((ele) => ele.imdbID === movie.imdbID)
              ? "Remove from watchlist"
              : "Add to watchlist"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Search;
