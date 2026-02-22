import Image from "next/image";
import React from "react";

const ProfileCard = () => {
  return (
    <main className="flex  justify-center items-center gap-4 sm:gap-6 px-4 w-full max-w-md">
      {/* Player */}
      <div
        className="flex flex-col items-center justify-center gap-1
      bg-white/70 backdrop-blur-2xl shadow-xl rounded-2xl
      py-3 px-4 sm:py-4 sm:px-6 ring-2 ring-pink-400
      w-[30%] min-w-[90px]"
      >
        <Image
          src={"/missio.jpg"}
          alt="Practise image"
          height={50}
          width={50}
          className="rounded-full sm:h-[60px] sm:w-[60px]"
        />

        <p className="text-[10px] sm:text-xs text-gray-400">Your Turn</p>
        <p className="font-bold text-sm sm:text-base">You</p>
      </div>

      {/* Score */}

      {/* Opponent */}
      <div
        className="flex flex-col items-center justify-center gap-1
      bg-white/70 backdrop-blur-2xl shadow-xl rounded-2xl
      py-3 px-4 sm:py-4 sm:px-6 ring-2 ring-pink-600
      w-[30%] min-w-[90px]"
      >
        <Image
          src={"/missio.jpg"}
          alt="Practise image"
          height={50}
          width={50}
          className="rounded-full sm:h-[60px] sm:w-[60px]"
        />

        <p className="text-[10px] sm:text-xs text-gray-400">Your Turn</p>
        <p className="font-bold text-sm sm:text-base">You</p>
      </div>
    </main>
  );
};

export default React.memo(ProfileCard);
