"use client"
import React, { useState } from "react";
import { Gamepad2, MessageCircle, Bot, HeartHandshake } from "lucide-react";

const Cards = [
  {
    title: "Play Stone Paper Scissors",
    text: "Start a game and get matched with someone special",
    icon: Gamepad2,
  },
  {
    title: "Chat & Connect",
    text: "Use voice messages and chat while playing",
    icon: MessageCircle,
  },
  {
    title: "AI Assistance",
    text: "Get smart suggestions for perfect conversations",
    icon: Bot,
  },
  {
    title: "Find Your Match",
    text: "Win the game and boost your compatibility score",
    icon: HeartHandshake,
  },
];

const HowItWorks = () => {

  const [index , setIndex]= useState(0)
  return (

    <main className="min-h-screen mt-12 bg-pink-50/30">
      <div className="max-w-2xl mx-auto w-full p-2">
        <h1 className="font-extrabold md:text-5xl text-xl text-gray-800 text-center">
          How It Works
        </h1>
        <p className="text-gray-400 text-center text-xl mt-4">
          Connect through a classic game of strategy and luck. Our platform makes meeting new people fun and effortless.
        </p>
      </div>

<div>
     <section className="flex items-center py-4 gap-8 w-full mt-12 max-w-[660px]  mx-auto overflow-hidden ">
        <div className="flex   gap-5 transition-transform duration-200 "style={{ transform: `translateX(-${index * 340}px)` }} >


        {Cards.map((card, i) => {
          const Icon = card.icon;

          return (
            <div
              key={i}
              className="flex flex-col items-center text-center shadow-xl py-8 px-6 rounded-2xl bg-white hover:shadow-2xl transition-all duration-300 w-[320px]"
            >
              <div className="bg-pink-100 p-4 rounded-full mb-4">
                <Icon size={28} className="text-pink-600" />
              </div>

              <p className="text-xl font-bold mb-2">{card.title}</p>
              <p className="text-gray-600">{card.text}</p>

            </div>
          );

          
       


        })} 


        

            

         </div>
         
         
      </section>
       <button className="bg-black rounded-xl px-4 py-6 text-white " onClick={()=> setIndex((prev) =>(prev + 1) % Cards.length)}>Next</button>  
      </div>
    </main>
  );
};

export default HowItWorks;