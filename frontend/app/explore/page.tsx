import ExplorePage from "@/component/(explore)/ExplorePage";
import React from "react";

export const metadata = {
  title: "Thise is the explore page.",
  description: "Here you can find the more person like you",
};

const Page = () => {
  return (
    <main>
      <ExplorePage />
    </main>
  );
};

export default Page;
