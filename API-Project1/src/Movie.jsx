import React, { useState } from "react";
import { FaBookmark, FaRegBookmark, FaStar } from "react-icons/fa";

const Movie = ({ movie, watchlist, handleWatchlistToggle }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRatingClick = (ratingValue) => {
    setRating(rating === ratingValue ? 0 : ratingValue);
  };

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
      <div className="description_wrapper">
        <h3 className="movie_title">{movie.Title}</h3>
        <h3 className="movie_year">{movie.Year}</h3>
        <div className="star_rating">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <FaStar
                key={index}
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onClick={() => handleRatingClick(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
                style={{ cursor: "pointer", fontSize: "1.5rem" }}
              />
            );
          })}
        </div>
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
    </div>
  );
};

export default Movie;
