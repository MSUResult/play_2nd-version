const choices = ["ROCK", "PAPER", "SCISSOR"];

export const playRound = (playerMove) => {
  const opponentMove = choices[Math.floor(Math.random() * choices.length)];

  let winner = "";

  if (playerMove === opponentMove) {
    winner = "DRAW";
  } else if (
    (playerMove === "ROCK" && opponentMove === "SCISSOR") ||
    (playerMove === "SCISSOR" && opponentMove === "PAPER") ||
    (playerMove === "PAPER" && opponentMove === "ROCK")
  ) {
    winner = "PLAYER";
  } else {
    winner = "OPPONENT";
  }

  return { opponentMove, winner };
};
