"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FONTS = [
  { key: "inter", label: "Inter", family: "'Inter', sans-serif" },
  { key: "geist", label: "Geist", family: "'Geist', sans-serif" },
  { key: "jetbrains", label: "JetBrains Mono", family: "'JetBrains Mono', monospace" },
  { key: "space", label: "Space Grotesk", family: "'Space Grotesk', sans-serif" },
] as const;

type FontKey = (typeof FONTS)[number]["key"];

interface FontContextType {
  font: FontKey;
  setFont: (font: FontKey) => void;
  fonts: typeof FONTS;
}

const FontContext = createContext<FontContextType>({
  font: "inter",
  setFont: () => {},
  fonts: FONTS,
});

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFont] = useState<FontKey>("inter");

  useEffect(() => {
    const saved = localStorage.getItem("streakcode-font") as FontKey | null;
    if (saved && FONTS.some((f) => f.key === saved)) {
      setFont(saved);
    }
  }, []);

  useEffect(() => {
    const selected = FONTS.find((f) => f.key === font);
    if (selected) {
      document.documentElement.style.fontFamily = selected.family;
      localStorage.setItem("streakcode-font", font);
    }
  }, [font]);

  return (
    <FontContext.Provider value={{ font, setFont, fonts: FONTS }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  return useContext(FontContext);
}
