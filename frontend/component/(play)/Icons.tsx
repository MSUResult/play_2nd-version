import Image from "next/image";
import React, { useState } from "react";
import GameSimple from "./Game";

const ICONS = [
  { name: "ROCK", icon: "/assetsIcons/rock.svg" },
  { name: "PAPER", icon: "/assetsIcons/PAPER.svg" },
  { name: "SCISSOR", icon: "/assetsIcons/paper.svg" },
  { name: "SNAKE", icon: "/assetsIcons/paper.svg" },
];

const Icons = ({ selected, setSelected }) => {
  return (
    <main className="flex flex-wrap justify-center gap-4 sm:gap-6 px-4 w-full">
      {ICONS.map((item) => {
        const isActive = selected == item.name;
        const isLocked = item.name === "SNAKE";
        return (
          <div
            key={item.name}
            className={`group flex flex-col  gap-4 justify-center min-w-0 items-center cursor-pointer 
                ${isLocked ? "cursor-not-allowed" : "cursor-pointer"}
                 `}
          >
            <div
              onClick={() => {
                if (!isLocked && !selected) {
                  setSelected(item.name);
                }
              }}
              className={`rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative overflow-hidden shadow-2xl p-3 transition-all duration-300
              
              ${
                isLocked
                  ? "bg-gray-600 brightness-50"
                  : isActive
                    ? "bg-white brightness-110 ring-4 ring-blue-400"
                    : "bg-white/70 brightness-90 group-hover:ring-2 group-hover:ring-blue-300"
              }
              `}
            >
              <Image
                src={item.icon}
                fill
                className="object-contain"
                alt={item.name}
              />
            </div>

            <h1
              className={`tracking-widest font-extrabold transition-colors duration-300
              ${isLocked ? "text-gray-400" : isActive ? "text-blue-500" : "text-gray-700 group-hover:text-blue-400"}
            `}
            >
              {item.name}
            </h1>
          </div>
        );
      })}
    </main>
  );
};

export default React.memo(Icons);
