"use client";
import React, { useEffect, useState } from "react";
import ProfileCard from "../ProfileCard";
import BoxShowing from "../BoxShowing";
import Icons from "../Icons";
import { playRound } from "../GameLogic";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/userContext";


const RecoredGame = ({ opponentId }) => {
  const router = useRouter();
  const { user } = useAuth();

  const [time, setTime] = useState(10);
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState([]); // This will hold all 6 moves
  const [round, setRound] = useState(1);
  const NumberOfRound = 6;

  // Function to send data to MongoDB
  const handleSaveMoves = async (finalMoves) => {
    try {
      await fetch('/api/save-game', {
        method: 'POST',
        body: JSON.stringify({
          player1: user.id,
          player2: opponentId,
          player1Moves: finalMoves,
          status: 'pending' // Pending because player 2 hasn't played yet
        })
      });
      router.push(`/result?status=saved`);
    } catch (error) {
      console.error("Failed to save game", error);
    }
  };

  // Timer Interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle Round Transition
  useEffect(() => {
    if (time === 0) {
      // 1. Capture the current move (or "NONE" if they were too slow)
      const currentMove = selected || "NONE";
      const updatedMoves = [...moves, currentMove];
      setMoves(updatedMoves);

      if (round < NumberOfRound) {
        // 2. Prepare for next round
        setRound((prev) => prev + 1);
        setSelected(null);
        setTime(10);
      } else {
        // 3. Game Over - Save to DB
        handleSaveMoves(updatedMoves);
      }
    }
  }, [time]);

  return (
    <main className="bg-primary min-h-screen flex items-center justify-center sm:px-6 py-4">
      <section className="flex flex-col items-center justify-center gap-8 sm:gap-10 lg:gap-12 w-full max-w-md">
        <div className="bg-gray-500 px-4 py-2 rounded-xl">
          <p className="font-bold text-green-500">{`Round ${round} / ${NumberOfRound}`}</p>
        </div>

        <ProfileCard />

        <div className="flex justify-center items-center bg-gray-500 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 divide-x w-[30%] min-w-[90px] max-w-[140px]">
          <p className="font-bold text-base sm:text-lg flex-1 text-center">
            {myScore || '1'}
          </p>
          <p className="font-bold text-base sm:text-lg flex-1 text-center">
            {opponentScore  || '1'}
          </p>
        </div>

        <BoxShowing selected={selected}  />

        <p className="font-bold text-gray-500 text-5xl shadow-2xl brightness-75">
          {time} s
        </p>

        <Icons selected={selected} setSelected={setSelected} />
      </section>
    </main>
  );
};

export default RecoredGame;