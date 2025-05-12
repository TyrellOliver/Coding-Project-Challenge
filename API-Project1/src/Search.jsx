import React, { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_KEY;
const type = "movie";
const SEARCH_TERM_TO_CHANGE_LATER = "batman";

const Search = () => {
  const [movies, setMovies] = useState([]);

  const fetchData = () => {
    try {
      fetch(
        `http://www.omdbapi.com/?apikey=${API}&s=${SEARCH_TERM_TO_CHANGE_LATER}&type=${type}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.Search);
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
      {movies.map((movie) => (
        <div key={movie.imdbID}>
          <h3>{movie.Title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Search;
