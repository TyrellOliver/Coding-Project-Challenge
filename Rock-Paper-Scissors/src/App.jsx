import { useState } from "react";
import "./App.css";

function App() {
  const [playerChoice, setPlayerChoice] = useState("");
  const [gameResult, setGameResult] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [comScore, setComScore] = useState(0);

  const handleOnCLick = (event) => {
    setPlayerChoice(event.target.dataset.choice);
  };

  console.log(playerChoice);

  const rockPaperScissors = () => {
    // console.log(playerChoice);
    const choices = ["rock", "paper", "scissors"];
    const computer = choices[Math.floor(Math.random() * 3)];
    console.log(computer);

    // let userScore = 0

    if (
      (playerChoice === "rock" && computer === "scissors") ||
      (playerChoice === "paper" && computer === "rock") ||
      (playerChoice === "scissors" && computer === "paper")
    ) {
      // playerScore++;
      // setPlayerScore(playerScore + 1);
      setPlayerScore((currPlayerScore) => currPlayerScore + 1);
      // console.log(
      //   `Game number: ${i + 1} You Win! Player Score: ${
      //     scoreBoard.playerScore
      //   }, Computer Score: ${scoreBoard.comScore}`
      // );
      console.log("You win!");
      setGameResult("You win!");
    } else if (playerChoice === computer) {
      // console.log(`Game number: ${i + 1} Draw!`);
      console.log("Draw!");
      setGameResult("Draw!");
    } else {
      setComScore((currComScore) => currComScore + 1);
      // console.log(
      //   `Game number: ${i + 1} You Lose! Player Score: ${
      //     scoreBoard.playerScore
      //   }, Computer Score: ${scoreBoard.comScore}`
      // );
      console.log("You Lose!");
      setGameResult("You Lose!");
    }
  };
  // console.log(rockPaperScissors(playerChoice));

  return (
    <>
      <h1>Rock, Paper, Scissors Game</h1>
      <h3>{gameResult}</h3>
      <h3>{playerScore}</h3>
      <h3>{comScore}</h3>
      <br />
      <div className="choices">
        <p className="choice one" data-choice="rock" onClick={handleOnCLick}>
          Rock
        </p>
        <p className="choice two" data-choice="paper" onClick={handleOnCLick}>
          Paper
        </p>
        <p
          className="choice three"
          data-choice="scissors"
          onClick={handleOnCLick}
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
