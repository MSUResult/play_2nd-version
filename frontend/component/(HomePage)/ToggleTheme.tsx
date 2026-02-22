"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ⛔ don't render before theme exists

  return (
    <main className="absolute z-10 bottom-0 right-4 ">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={` ${theme == "dark" ? "bg-gray-700" : "bg-gray-300"}  px-6 py-4 border-rounded transform-all duration-500 `}
      >
        {theme == "light" ? <Sun /> : <Moon />}
      </button>
    </main>
  );
}
