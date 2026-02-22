"use client";
import Singupform from "@/component/(auth)/singupform";
import { useAuth } from "@/context/userContext";
import React from "react";

const page = () => {
  const { user } = useAuth();
  return <main className="">{user ? "login" : <Singupform />}</main>;
};

export default page;

// <div>
//   <h1>Hello {user?.name || "Guest"}</h1>
//   <h2>Online Users:</h2>
//   <div>
//     {onlineUsers.map((u) => (
//       <div key={u.id}>{u.name}</div>
//     ))}
//   </div>
// </div>
