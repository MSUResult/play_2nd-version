"use client";
import React, { useEffect, useState } from "react";
import ProfileCard from "../ProfileCard";
import BoxShowing from "../BoxShowing";
import Icons from "../Icons";
import { playRound } from "../GameLogic";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/userContext";
import { useSocket } from "@/context/useSocket";

const LiveGame = ({ roomId }) => {
  const router = useRouter();
  const { user } = useAuth();
  
  // 1. Pulling live data from socket context
  const { sendMove, opponentMove, syncedWinner, resetRoundData } = useSocket();

  // 2. Local UI states
  const [time, setTime] = useState(10);
  const [selected, setSelected] = useState(null);
  const [winner, setWinner] = useState(null);
  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [round, setRound] = useState(1);
  const NumberOfRound = 6;

  // EFFECT 1: Send my move to the server when I select it
  useEffect(() => {
    if (!selected) return;
    sendMove("playerMove", {
      roomId,
      playerId: user?.id,
      move: selected,
    });
  }, [selected, roomId, user, sendMove]);

  // EFFECT 2: Calculate winner ONLY when both players have moved
  useEffect(() => {
    if (!selected || !opponentMove) return;

    // Pass BOTH moves to our newly updated GameLogic
    const result = playRound(selected, opponentMove);
  
    const timeout = setTimeout(() => {
      setWinner(result.winner);
      // Sync result to room 
      sendMove("roundResult", { roomId, result: result.winner });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [selected, opponentMove, roomId, sendMove]);

  // EFFECT 3: Update scores when a winner is decided
  useEffect(() => {
    const finalWinner = syncedWinner || winner; 
    if (!finalWinner) return;

    if (finalWinner === "PLAYER") {
      setMyScore((prev) => prev + 1);
    } else if (finalWinner === "OPPONENT") {
      setOpponentScore((prev) => prev + 1);
    }
  }, [winner, syncedWinner]);

  // EFFECT 4: The Timer (Only ONE interval now)
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // EFFECT 5: Handle End of Round / End of Game (Only ONE logic block now)
  useEffect(() => {
    if (time === 0) {
      if (round < NumberOfRound) {
        // Reset everything for the next round
        setSelected(null);
        setWinner(null);
        resetRoundData(); // Clear socket state!
        setRound((prev) => prev + 1);
        setTime(10);
      } else {
        // Game Over, go to results
        router.push(`/result?myScore=${myScore}&opponentScore=${opponentScore}`);
      }
    }
  }, [time, round, myScore, opponentScore, router, resetRoundData]);

  return (
    <main className="bg-primary min-h-screen flex items-center justify-center sm:px-6 py-4">
      <section className="flex flex-col items-center justify-center gap-8 sm:gap-10 lg:gap-12 w-full max-w-md">
        <div className="bg-gray-500 px-4 py-2 rounded-xl">
          <p className="font-bold text-green-500">{`Round ${round} / ${NumberOfRound}`}</p>
        </div>

        <ProfileCard />

        <div className="flex justify-center items-center bg-gray-500 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 divide-x w-[30%] min-w-[90px] max-w-[140px]">
          <p className="font-bold text-base sm:text-lg flex-1 text-center">
            {myScore}
          </p>
          <p className="font-bold text-base sm:text-lg flex-1 text-center">
            {opponentScore}
          </p>
        </div>

        <BoxShowing selected={selected} opponentMove={opponentMove} />

        <p className="font-bold text-gray-500 text-5xl shadow-2xl brightness-75">
          {time} s
        </p>

        <Icons selected={selected} setSelected={setSelected} />
      </section>
    </main>
  );
};

export default LiveGame;