import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const Movie = ({ movie, watchlist, handleWatchlistToggle }) => {
  console.log(movie);
  return (
    <div className="movie_card">
      <div className="poster_wrapper">
        <img
          className="movie_poster"
          src={movie.Poster}
          alt={`Poster for ${movie.Title}`}
        />
      </div>
      <h3 className="movie_title">{movie.Title}</h3>
      <h3 className="movie_year">{movie.Year}</h3>
      <button
        className="movie_watchlist_button"
        onClick={() => {
          handleWatchlistToggle(movie);
        }}
      >
        {watchlist.some((mov) => mov.imdbID === movie.imdbID) ? (
          <FaBookmark className="watchlist_icon" />
        ) : (
          <FaRegBookmark className="watchlist_icon" />
        )}
      </button>
    </div>
  );
};

export default Movie;
