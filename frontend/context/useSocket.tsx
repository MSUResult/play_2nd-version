"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/utils/socket/socket.js";
import { useAuth } from "./userContext";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const { user, loading } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [incomingChallenge, setIncomingChallenge] = useState(null);
  const [matchRoom, setMatchRoom] = useState(null);

  // NEW: Game-specific states
  const [opponentMove, setOpponentMove] = useState(null);
  const [syncedWinner, setSyncedWinner] = useState(null);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      if (socket.connected) socket.disconnect();
      setOnlineUsers([]);
      return;
    }

    const id = user.id;
    if (!id) {
      console.warn("SocketProvider: user has no id:", user);
      return;
    }

    const handleConnect = () => {
      console.log("Socket: connected, emitting newUser", id);
      socket.emit("newUser", {
        id,
        name: user.name ?? user.username ?? "Unknown",
        avatar: user.avatar ?? null,
      });
    };

    const handleOnlineUsers = (users) => {
      console.log("Socket: received onlineUsers", users);
      setOnlineUsers(users ?? []);
    };

    const handleDisconnect = () => {
      console.log("Socket: disconnected");
      setOnlineUsers([]);
    };

    socket.on("connect", handleConnect);
    socket.on("onlineUsers", handleOnlineUsers);
    socket.on("disconnect", handleDisconnect);

    if (!socket.connected) socket.connect();
    else handleConnect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("onlineUsers", handleOnlineUsers);
      socket.off("disconnect", handleDisconnect);
    };
  }, [user, loading]);

  // Incoming Challenge
  useEffect(() => {
    socket.on("challengeReceived", (data) => {
      console.log("Challenge received from:", data.from);
      setIncomingChallenge(data.from);
    });

    return () => {
      socket.off("challengeReceived");
    };
  }, []);

  // Match Start
  useEffect(() => {
    const handleMatchStart = (data) => {
      console.log("Match Started", data);
      setMatchRoom(data.roomId);
    };

    socket.on("matchStart", handleMatchStart);

    return () => {
      socket.off("matchStart", handleMatchStart);
    };
  }, []);
  



  // NEW: LISTEN FOR GAME EVENTS 

  useEffect(()=> {
    const handleOpponentMove = (data) => {
      console.log("Opponent played:", data.move);
      setOpponentMove(data.move);
    };

    const handleRoundResultSync = (result) => {
      console.log("Round result synced:", result);
      setSyncedWinner(result);
    };

    socket.on("opponentMove", handleOpponentMove);
    socket.on("roundResultSync", handleRoundResultSync);

  return () => {
      socket.off("opponentMove", handleOpponentMove);
      socket.off("roundResultSync", handleRoundResultSync);
    };
  },[])

  const resetRoundData = ()=> {
    setOpponentMove(null)
    setSyncedWinner(null)
  }










  const sendMove = (type, data) => {
    socket.emit(type, { ...data });
  };

  return (
    <SocketContext.Provider
      value={{
        onlineUsers,
        sendMove,
        incomingChallenge,
        setIncomingChallenge,
        matchRoom,
        opponentMove,
        syncedWinner,
        resetRoundData
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error("useSocket must be used within a SocketProvider");
  return context;
};
