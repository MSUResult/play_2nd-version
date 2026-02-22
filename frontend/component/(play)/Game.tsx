"use client";
import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import BoxShowing from "./BoxShowing";
import Icons from "./Icons";
import { playRound } from "./GameLogic";
import { useRouter } from "next/navigation";

const Game = () => {
  const [time, setTime] = useState(10);
  const [selected, setSelected] = useState(null);

  const [opponentMove, setOpponentMove] = useState(null);
  const [winner, setWinner] = useState(null);

  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  const [round, setRound] = useState(1);
  const NumberOfRound = 6;
  const router = useRouter();

  useEffect(() => {
    if (!winner) return;

    if (winner === "PLAYER") {
      setMyScore((prev) => prev + 1);
    }
    if (winner === "OPPONENT") {
      setOpponentScore((prev) => prev + 1);
    }
  }, [winner]);

  useEffect(() => {
    if (!selected) return;

    const result = playRound(selected);
    setOpponentMove(result.opponentMove);

    const timeout = setTimeout(() => {
      setWinner(result.winner);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [selected]);

  //pushing to result page
  useEffect(() => {
    if (round > NumberOfRound) {
      router.push(`/result?myScore=${myScore}&opponentScore=${opponentScore}`);
    }
  }, [round, router]);

  // FIX 1: The timer ONLY manages time, making it a pure function.
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(timer);
  }, []);

  // FIX 2: A separate effect watches the time to trigger round resets.
  useEffect(() => {
    if (time === 0) {
      if (round < NumberOfRound) {
        setSelected(null);
        setOpponentMove(null);
        setWinner(null);
        setRound((prevRound) => prevRound + 1);

        // Reset the clock for the next round
        setTime(10);
      } else {
        setRound((prevRound) => prevRound + 1); // triggers navigation
      }
    }
  }, [time]);

  return (
    <main className="bg-primary min-h-screen flex items-center justify-center sm:px-6 py-4">
      <section className="flex flex-col items-center justify-center gap-8 sm:gap-10 lg:gap-12 w-full max-w-md">
        <div className="bg-gray-500 px-4 py-2 rounded-xl">
          <p className="font-bold text-green-500">{`Round ${round} / 6`}</p>
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

export default Game;
