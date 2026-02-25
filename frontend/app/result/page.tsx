import Result from "@/component/(play)/Result";
import React from "react";

export const dynamic = "force-dynamic";

const page = async({ searchParams }) => {

  const resolvedParams = await searchParams;
  const myScore = Number(resolvedParams.myScore || 0);
  const opponentScore = Number(resolvedParams.opponentScore || 0);
  return <Result myScore={myScore} opponentScore={opponentScore} />;
};

export default page;
