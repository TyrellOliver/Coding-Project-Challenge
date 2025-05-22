import React from "react";
import { useNavigate } from "react-router-dom";

import Movie from "./Movie";

const Watchlist = ({ watchlist, handleWatchlistToggle }) => {
  const navigate = useNavigate();

  console.log("The watchlist: ", watchlist);
  return (
    <div className="watchlist">
      <button onClick={() => navigate(-1)}>Go back</button>
      {watchlist.map((movie) => {
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

export default Watchlist;
