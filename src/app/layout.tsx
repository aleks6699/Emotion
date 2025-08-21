"use client";
import React, { ReactNode } from "react";
import { observer } from "mobx-react-lite";
import { emotionStore } from "../stores/EmotionStore";
import { Header } from "@/components/Header";
import { AddEmotionModal } from "@/components/AddEmotionModal";
import { useMounted } from "@/hooks/useMounted";
import { LayoutSkeleton } from "@/components/LayoutSkeleton";
import "./globals.css";

const bgClasses = {
  morning: "bg-gradient-to-br from-orange-400 via-yellow-300 to-pink-400",
  day: "bg-gradient-to-br from-blue-400 via-cyan-300 to-teal-400",
  evening: "bg-gradient-to-br from-purple-500 via-indigo-400 to-blue-500",
};

const Layout = observer(({ children }: { children: ReactNode }) => {
  const mounted = useMounted();
  const currentTime = mounted ? emotionStore.timeOfDay : "day";
  const bgClass = bgClasses[currentTime];
  if (!useMounted()) {
    return (
      <html lang="en">
        <body className={`min-h-screen ${bgClass}`}>
          <LayoutSkeleton />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`min-h-screen transition-all duration-1000 ${bgClass}`}>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        <AddEmotionModal />
      </body>
    </html>
  );
});

export default Layout;
