import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <h1>Rock, Paper, Scissors Game</h1>
      <br />
      <div className="choices">
        <p className="choice one">Rock</p>
        <p className="choice two">Paper</p>
        <p className="choice three">Scissors</p>
      </div>
      <br />
      <button>Go!</button>
    </>
  );
}

export default App;
