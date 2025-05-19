import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Movie from "./Movie";

const API = import.meta.env.VITE_API_KEY;
const type = "movie";
const SEARCH_TERM_TO_CHANGE_LATER = "batman";

const Search = ({ watchlist, handleWatchlistToggle }) => {
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
      <Link to={"/watchlist"}>My Watchlist</Link>
      {movies.map((movie) => {
        return (
          <Movie
            key={movie.imdbID}
            movie={movie}
            watchlist={watchlist}
            handleWatchlistToggle={handleWatchlistToggle}
          />
        );
      })}
    </div>
  );
};

export default Search;
