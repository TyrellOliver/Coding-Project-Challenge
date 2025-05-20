import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Movie from "./Movie";

const API = import.meta.env.VITE_API_KEY;
const type = "movie";

const Search = ({ watchlist, handleWatchlistToggle }) => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const handleTextChange = (event) => {
    setSearch(event.target.value);
  };

  const handleButtonClick = () => {
    search ? fetchData(search) : "";
  };

  const fetchData = (search) => {
    try {
      fetch(`http://www.omdbapi.com/?apikey=${API}&s=${search}&type=${type}`)
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
    localStorage.setItem("watchlistData", JSON.stringify(watchlist));
  }, [watchlist]);

  return (
    <div className="search">
      <h1>Movies</h1>
      <input
        type="text"
        placeholder="Search For Movie..."
        id="searchInput"
        value={search}
        onChange={handleTextChange}
        onKeyDown={(e) => e.key === "Enter" && handleButtonClick()}
      />
      <button onClick={handleButtonClick}>Submit</button>
      <h2>{watchlist.length}</h2>
      <br />
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
