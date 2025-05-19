import React from "react";

const Watchlist = ({ watchlist }) => {
  console.log("The watchlist: ", watchlist);
  return (
    <div className="watchlist">
      {watchlist.map((movie) => (
        <div key={movie.imdbID}>
          <h3>{movie.Title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
