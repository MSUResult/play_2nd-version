"use client";
import { House, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const Result = ({ myScore, opponentScore }) => {
  const isWin = myScore > opponentScore;
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-slate-50">
      <div className="w-full max-w-lg flex flex-col items-center gap-8 md:gap-12 py-10 bg-white rounded-3xl  border border-gray-100 md:p-12">
        {/* SCORE SECTION */}
        <div className="w-full text-center">
          <div className="inline-block border-b-2 border-gray-200 pb-2 px-4">
            <p className="tracking-widest text-gray-500 font-bold text-xs sm:text-sm uppercase">
              Final Score
            </p>
            <p className="text-2xl sm:text-3xl font-black text-gray-800">
              {myScore} <span className="text-gray-300 mx-1">—</span>{" "}
              {opponentScore}
            </p>
          </div>
        </div>

        {/* VERSUS IMAGE SECTION */}
        <div className="flex w-full justify-around items-center gap-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gray-800 rounded-2xl blur opacity-25"></div>
            <Image
              src="/missio.jpg"
              alt="player"
              height={100}
              width={100}
              className="relative rounded-2xl ring-4 ring-white w-20 h-20 sm:w-28 sm:h-28 object-cover shadow-lg"
            />
          </motion.div>

          <motion.p
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-black text-gray-300 italic text-2xl sm:text-4xl"
          >
            VS
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative"
          >
            <div
              className={`absolute -inset-1 ${isWin ? "bg-gray-800" : "bg-pink-600"} rounded-2xl blur opacity-25`}
            ></div>
            <Image
              src="/missio.jpg"
              alt="opponent"
              height={100}
              width={100}
              className={`relative rounded-2xl ring-4 ring-white w-20 h-20 sm:w-28 sm:h-28 object-cover shadow-lg ${!isWin ? "ring-pink-100" : ""}`}
            />
          </motion.div>
        </div>

        {/* RESULT TEXT */}
        <div className="text-center space-y-2">
          <h1
            className={`font-black tracking-tighter text-5xl sm:text-6xl md:text-7xl ${isWin ? "text-cyan-600" : "text-pink-700"}`}
          >
            {isWin ? "VICTORY!" : "DEFEATED!"}
          </h1>
          <p className="text-gray-500 font-medium italic text-sm sm:text-base">
            {isWin
              ? "You dominated the arena!"
              : "Player is laughing at you..."}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3 w-full sm:px-8">
          <button className="group relative bg-cyan-500 py-4 w-full font-bold hover:bg-cyan-600 flex items-center gap-3 justify-center rounded-2xl shadow-lg shadow-cyan-200 text-white transition-all active:scale-95">
            <LoaderCircle className="w-5 h-5 animate-spin-slow group-hover:rotate-180 transition-transform" />
            Rematch
          </button>

          <button className="bg-white py-4 w-full font-bold hover:bg-gray-50 flex items-center gap-3 justify-center rounded-2xl border-2 border-gray-100 text-gray-600 transition-all active:scale-95">
            <House className="w-5 h-5" />
            Quit Game
          </button>
        </div>
      </div>
    </main>
  );
};

export default Result;
