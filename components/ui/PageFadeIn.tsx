"use client";

import { useEffect, useState } from "react";

const ENTER_DELAY_MS = 50;

export default function PageFadeIn({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), ENTER_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex min-h-screen flex-col transition-opacity duration-700 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
