import Result from "@/component/(play)/Result";
import React from "react";

export const dynamic = "force-dynamic";

const page = ({ searchParams }) => {
  const myScore = Number(searchParams.myScore || 0);
  const opponentScore = Number(searchParams.opponentScore || 0);
  return <Result myScore={myScore} opponentScore={opponentScore} />;
};

export default page;
