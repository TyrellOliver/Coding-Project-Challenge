import { useState } from "react";
import "./App.css";

function App() {
  const [playerChoice, setPlayerChoice] = useState("");
  const [comChoice, setComChoice] = useState("");
  const [gameResult, setGameResult] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [comScore, setComScore] = useState(0);

  const handleOnCLick = (event) => {
    setPlayerChoice(event.target.dataset.choice);
  };

  console.log(playerChoice);
  // console.log(comChoice);

  const rockPaperScissors = () => {
    const choices = ["rock", "paper", "scissors"];
    const computer = choices[Math.floor(Math.random() * 3)];
    setComChoice(computer);

    // How come console logging comChoice within the function doesn't log to the console
    console.log(computer);

    if (
      (playerChoice === "rock" && computer === "scissors") ||
      (playerChoice === "paper" && computer === "rock") ||
      (playerChoice === "scissors" && computer === "paper")
    ) {
      // playerScore++;
      // setPlayerScore(playerScore + 1);
      setPlayerScore((currPlayerScore) => currPlayerScore + 1);
      console.log("You win!");
      setGameResult("You win!");
    } else if (playerChoice === computer) {
      console.log("Draw!");
      setGameResult("Draw!");
    } else {
      setComScore((currComScore) => currComScore + 1);
      console.log("You Lose!");
      setGameResult("You Lose!");
    }
  };
  console.log(comChoice);

  return (
    <>
      <div className="playerScore">
        <p>Player Score:</p>
        <h3>{playerScore}</h3>
      </div>
      <div className="computerScore">
        <p>Computer Score:</p>
        <h3>{comScore}</h3>
      </div>
      <h1>Rock, Paper, Scissors Game</h1>
      <h3>{gameResult}</h3>
      <h3>{comChoice}</h3>
      <br />
      <div className="choices">
        <p
          className="choice one"
          data-choice="rock"
          onClick={handleOnCLick}
          style={{ color: playerChoice === "rock" ? "red" : "black" }}
        >
          Rock
        </p>
        <p
          className="choice two"
          data-choice="paper"
          onClick={handleOnCLick}
          style={{ color: playerChoice === "paper" ? "red" : "black" }}
        >
          Paper
        </p>
        <p
          className="choice three"
          data-choice="scissors"
          onClick={handleOnCLick}
          style={{ color: playerChoice === "scissors" ? "red" : "black" }}
        >
          Scissors
        </p>
      </div>
      <br />
      <button onClick={rockPaperScissors}>Go!</button>
    </>
  );
}

export default App;
