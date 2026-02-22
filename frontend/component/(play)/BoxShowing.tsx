import Image from "next/image";
import React from "react";

const BoxShowing = ({ selected, opponentMove }) => {
  const ICONS = {
    ROCK: "/assetsIcons/rock.svg",
    PAPER: "/assetsIcons/paper.svg",
    SCISSOR: "/assetsIcons/scissor.svg",
  };

  return (
    <main className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
      {}
      <div
        className="relative 
      w-24 h-28
      sm:w-28 sm:h-32
      md:w-32 md:h-36
      ring-2 ring-red-500 rounded-2xl 
      flex flex-col items-center justify-center gap-2"
      >
        <Image
          src={ICONS[selected] || "/missio.jpg"}
          className="rounded-full sm:h-[60px] sm:w-[60px]"
          height={50}
          width={50}
          alt="notshowing"
        />

        <p className="absolute bottom-2 font-bold text-sm sm:text-base md:text-lg">
          you
        </p>
      </div>

      <p className="text-lg sm:text-xl md:text-2xl font-extrabold text-pink-400 tracking-widest animate-pulse">
        VS
      </p>

      <div
        className="relative 
      w-24 h-28
      sm:w-28 sm:h-32
      md:w-32 md:h-36
      ring-2 ring-red-500 rounded-2xl 
      flex flex-col items-center justify-center gap-2"
      >
        <Image
          src={ICONS[opponentMove] || "/missio.jpg"}
          className="rounded-full sm:h-[60px] sm:w-[60px]"
          height={50}
          width={50}
          alt="notshowing"
        />

        <p className="absolute bottom-2 font-bold text-sm sm:text-base md:text-lg">
          you
        </p>
      </div>
    </main>
  );
};

export default React.memo(BoxShowing);
