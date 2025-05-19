import React from "react";

const Movie = ({ movie, watchlist, handleWatchlistToggle }) => {
  return (
    <div className="movie_card">
        {/* {console.log(movie)} */}
        <h3>{movie.Title}</h3>
        <button
          onClick={() => {
            handleWatchlistToggle(movie);
          }}
        >
          {watchlist.some((ele) => ele.imdbID === movie.imdbID)
            ? "Remove from watchlist"
            : "Add to watchlist"}
        </button>
    </div>
  );
};

export default Movie;
