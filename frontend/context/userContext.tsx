"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({
  user: null,
  loading: true,
});

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const res = await fetch("/api/me", {
        method: "GET",
        credentials: "include", // Essential for sending cookies

        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        // If 401, it effectively means no user, so null is correct
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user); // Make sure API returns { user: ... }
    } catch (error) {
      console.error("🔴 [Client] checkUser failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => useContext(UserContext);
