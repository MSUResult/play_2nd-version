"use client";
import { useAuth } from "@/context/userContext";
import { useSocket } from "@/context/useSocket";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Homepage = () => {
  const { user, loading } = useAuth();
  const {
    onlineUsers,
    sendMove,
    incomingChallenge,
    setIncomingChallenge,
    matchRoom,
  } = useSocket();

  const [target, setTarget] = useState("");
  const router = useRouter();

  // JOINING MATCH ROOM
  useEffect(() => {
    if (!matchRoom) return;
    router.push(`/play/live/${matchRoom}`);
  }, [matchRoom, router]);

  const handleClick = () => {
    if (!target) {
      alert("Please select an opponent first!");
      return;
    }

    sendMove("playerChallenging", {
      to: target,
      from: user?.id,
    });

    console.log(`Challenge sent to ${target}`);
  };

  const acceptChallenge = () => {
    sendMove("challengeAccept", {
      from: incomingChallenge,
      to: user?.id,
    });
    setIncomingChallenge(null);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl font-bold text-pink-500">Loading...</div>;

  return (
    <main className="min-h-screen bg-pink-50/30 pb-10 font-sans text-gray-800">
      {/* Challenge Notification */}
      {incomingChallenge && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl z-50 border-2 border-pink-400 flex flex-col items-center">
          <p className="font-bold text-lg mb-4 text-gray-800">
            ⚔️ You got challenged by: <span className="text-pink-500">{incomingChallenge}</span>
          </p>
          <div className="flex gap-4 w-full">
            <button
              onClick={acceptChallenge}
              className="flex-1 bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all"
            >
              Accept
            </button>
            <button
              onClick={() => setIncomingChallenge(null)}
              className="flex-1 bg-gradient-to-r from-red-400 to-red-500 text-white px-4 py-2 rounded-xl font-bold hover:shadow-lg hover:shadow-red-500/30 transition-all"
            >
              Decline
            </button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <section className="flex flex-col items-center pt-16 pb-10 space-y-6 px-4">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-5xl flex gap-3"
        >
          👊 ✋ ✌️
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 leading-tight"
        >
          Rock Paper Scissors <br />
          <span className="text-3xl md:text-4xl text-gray-700">A Fun Dating Experience</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-medium text-lg text-gray-600 text-center max-w-xl"
        >
          Why swipe when you can play? Beat your crush in a game, win a date in real life!
        </motion.p>
      </section>

      {/* Main Play Arena Section */}
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-stretch justify-center px-6 max-w-7xl mx-auto mt-4">
        
        {/* Your Profile Card */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-500 font-bold mb-3 tracking-widest text-sm uppercase">You</p>
          <div className="relative w-56 h-72 rounded-2xl overflow-hidden shadow-xl shadow-pink-500/10 shrink-0 border border-white/50">
            <Image
              src={user?.avatar || "/missio.jpg"}
              alt="My Profile"
              width={250}
              height={320}
              className="object-cover w-full h-full"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
            <p className="absolute text-white font-extrabold text-2xl bottom-4 left-4 drop-shadow-md">
              You
            </p>
          </div>
        </div>

        {/* Challenge Button Card */}
        <div
          className="group relative flex flex-col justify-center items-center p-10 md:p-14 w-full max-w-sm rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl cursor-pointer hover:shadow-pink-500/20 transition-all duration-300 self-center"
          onClick={handleClick}
        >
          <h2 className="text-sm tracking-widest text-pink-500 font-bold mb-4">
            CHALLENGE NOW
          </h2>
          <p className="text-3xl md:text-4xl font-black text-gray-800 text-center leading-tight mb-6">
            ROCK PAPER <br /> SCISSORS
          </p>
          
          <button className="py-4 px-8 w-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-bold rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300 pointer-events-none">
            {target ? "Send Challenge" : "Select Opponent First"}
          </button>
        </div>

        {/* Online Users List */}
        <div className="flex flex-col items-center">
          <p className="text-gray-500 font-bold mb-3 tracking-widest text-sm uppercase">Opponents</p>
          <div className="flex flex-col gap-5 max-h-[400px] overflow-y-auto px-4 py-2 scrollbar-hide w-64 items-center">
            {onlineUsers
              .filter((opponent) => opponent.id !== user?.id)
              .map((opponent) => {
                const isSelected = target === opponent.id;

                return (
                  // Unified Card Styling for Opponents
                  <div
                    key={opponent.id}
                    onClick={() => setTarget(opponent.id)}
                    className={`relative w-56 h-72 rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 shrink-0
                    ${isSelected 
                      ? "ring-4 ring-pink-500 scale-105 shadow-pink-500/40" 
                      : "border border-white/50 hover:scale-105 hover:shadow-xl"
                    }`}
                  >
                    <Image
                      src={opponent?.avatar || "/missio.jpg"}
                      alt={opponent.name}
                      width={250}
                      height={320}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                    
                    {/* Selected Badge */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 bg-pink-500 text-white p-1.5 rounded-full shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}

                    <p className="absolute text-white font-extrabold text-2xl bottom-4 left-4 drop-shadow-md truncate w-11/12">
                      {opponent.name}
                    </p>
                  </div>
                );
              })}

            {onlineUsers.length <= 1 && (
              <div className="h-72 w-56 flex items-center justify-center text-center p-6 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-medium bg-white/30 backdrop-blur-sm">
                Waiting for other players to join...
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;