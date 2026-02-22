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
    // FIX: Prevent challenging if no target is selected
    if (!target) {
      alert("Please select an opponent first!");
      return;
    }

    sendMove("playerChallenging", {
      to: target,
      from: user?.id,
    });

    // Optional: give user feedback that challenge was sent
    console.log(`Challenge sent to ${target}`);
  };

  const acceptChallenge = () => {
    sendMove("challengeAccept", {
      from: incomingChallenge,
      to: user?.id,
    });
    setIncomingChallenge(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-primary pb-10">
      {/* Challenge Notification */}
      {incomingChallenge && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-xl shadow-2xl z-50 border-2 border-pink-400">
          <p className="font-bold text-lg mb-4">
            You got challenged by: {incomingChallenge}
          </p>
          <div className="flex gap-4">
            <button
              onClick={acceptChallenge}
              className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600"
            >
              Accept
            </button>
            <button
              onClick={() => setIncomingChallenge(null)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600"
            >
              Decline
            </button>
          </div>
        </div>
      )}

      <section className="flex flex-col items-center p-18 space-y-8">
        <motion.p
          animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-4xl flex gap-2"
        >
          👊✋✌️
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-pink-400 to-purple-400"
        >
          Rock Paper Scissors <br /> A Fun Dating Experience
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-bold text-xl text-center px-4"
        >
          Why swipe when you can play? Beat your crush in a game, win a date in
          real life!
        </motion.p>
      </section>

      <section className="flex md:flex-row gap-18 items-center justify-center flex-col px-4">
        {/* Your Profile Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-3 hover:scale-105 transition flex flex-col items-center">
          <Image
            src={user?.avatar || "/missio.jpg"}
            alt="My Profile"
            height={350}
            width={350}
            className="rounded-xl object-cover"
          />
          <p className="font-bold text-xl mt-3">You</p>
        </div>

        {/* Challenge Button Card */}
        <div
          className="shadow-2xl justify-center items-center p-10 md:p-14 rounded-2xl flex flex-col space-y-6 bg-white/60 backdrop-blur-xl border border-white/40 cursor-pointer hover:shadow-pink-500/20 transition-all"
          onClick={handleClick}
        >
          <h1 className="text-sm tracking-widest text-pink-400 font-semibold">
            CHALLENGE NOW
          </h1>
          <p className="text-3xl font-extrabold text-gray-800 text-center leading-tight">
            ROCK PAPER <br />
            SCISSORS
          </p>
          <motion.p
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-4xl flex gap-2"
          >
            👊✋✌️
          </motion.p>

          <button className="py-3 px-8 bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 text-white rounded-xl shadow-md pointer-events-none">
            Send Challenge
          </button>
        </div>

        {/* Online Users List */}
        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto p-4">
          {onlineUsers
            .filter((opponent) => opponent.id !== user?.id) // FIX: Don't show yourself!
            .map((opponent) => {
              const isSelected = target === opponent.id;

              return (
                <div
                  className={`relative bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-3 cursor-pointer transition-all duration-200 hover:scale-105 
                  ${isSelected ? "ring-4 ring-pink-500 scale-105" : ""}`} // Add visual feedback for selected user
                  key={opponent.id}
                  onClick={() => setTarget(opponent.id)}
                >
                  <Image
                    src={opponent?.avatar || "/missio.jpg"}
                    alt={opponent.name}
                    height={150} // Kept smaller for the list
                    width={150}
                    className="rounded-xl object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
                  <p className="absolute text-white font-bold text-xl bottom-4 left-4">
                    {opponent.name}
                  </p>
                </div>
              );
            })}

          {onlineUsers.length <= 1 && (
            <p className="text-gray-500 font-semibold">
              Waiting for other players to join...
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Homepage;
