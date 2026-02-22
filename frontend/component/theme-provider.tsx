"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class" // attribute class allowed tailwimd dark class
      defaultTheme="system"
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}
