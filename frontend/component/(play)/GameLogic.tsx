const choices = ["ROCK", "PAPER", "SCISSOR"];

// Notice the new optional parameter: liveOpponentMove
export const playRound = (playerMove, liveOpponentMove = null) => {
  // If liveOpponentMove is provided, use it. Otherwise, Bot plays a random move!
  const finalOpponentMove = liveOpponentMove || choices[Math.floor(Math.random() * choices.length)];

  let winner = "";

  if (playerMove === finalOpponentMove) {
    winner = "DRAW";
  } else if (
    (playerMove === "ROCK" && finalOpponentMove === "SCISSOR") ||
    (playerMove === "SCISSOR" && finalOpponentMove === "PAPER") ||
    (playerMove === "PAPER" && finalOpponentMove === "ROCK")
  ) {
    winner = "PLAYER";
  } else {
    winner = "OPPONENT";
  }

  // Return the move that was actually played so the UI can show it
  return { opponentMove: finalOpponentMove, winner };
};