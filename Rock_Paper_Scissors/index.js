function RPS(choice, gamesPlayed) {
  choice = choice.toLowerCase();

  const scoreBoard = {
    playerScore: 0,
    comScore: 0,
  };

  for (let i = 0; i < gamesPlayed; i++) {
    const choices = ["rock", "paper", "scissors"];
    const computer = choices[Math.floor(Math.random() * 3)];
    console.log("Computer's Choice:", computer);

    // const gameNum = `Game number: ${i + 1}`;
    // console.log(gameNum);

    if (
      (choice === "rock" && computer === "scissors") ||
      (choice === "paper" && computer === "rock") ||
      (choice === "scissors" && computer === "paper")
    ) {
      scoreBoard.playerScore++;
      console.log(
        `Game number: ${i + 1} You Win! Player Score: ${
          scoreBoard.playerScore
        }, Computer Score: ${scoreBoard.comScore}`
      );
    } else if (choice === computer) {
      console.log(`Game number: ${i + 1} Draw!`);
    } else {
      scoreBoard.comScore++;
      console.log(
        `Game number: ${i + 1} You Lose! Player Score: ${
          scoreBoard.playerScore
        }, Computer Score: ${scoreBoard.comScore}`
      );
    }
  }
}

console.log(RPS("Rock", 3));
// console.log(RPS("Paper"));
// console.log(RPS("Scissors"));
