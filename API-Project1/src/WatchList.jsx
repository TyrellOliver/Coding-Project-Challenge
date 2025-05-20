import React from "react";
import { useNavigate } from "react-router-dom";

const Watchlist = ({ watchlist }) => {
  const navigate = useNavigate();

  console.log("The watchlist: ", watchlist);
  return (
    <div className="watchlist">
      <button onClick={() => navigate(-1)}>Go back</button>
      {watchlist.map((movie) => (
        <div key={movie.imdbID}>
          <h3>{movie.Title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
