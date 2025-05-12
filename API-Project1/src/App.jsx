import { useState, useEffect } from "react";
import "./App.css";

const API = import.meta.env.VITE_API_KEY;
const type = "movie";
console.log(API);
function App() {
  
  const fetchData = () => {
    try {
      fetch(`http://www.omdbapi.com/?apikey=${API}&type=${type}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log("Error fetching movies", error);
      return error;
    }
  };

  return (
    <>
      <h1>Movies</h1>
    </>
  );
}

export default App;
