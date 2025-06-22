"use client";
import React from "react";
import { observer } from "mobx-react-lite";
import { emotionStore } from "../stores/EmotionStore";
import { BoardHeader } from "@/components/BoardHeader";
import { DesktopGrid } from "@/components/DesktopGrid";
import { EmptyBoard } from "@/components/EmptyBoard";
import { MobileList } from "@/components/MobileList";
import { useTouchReorder } from "@/hooks/useTouchReorder";

const EmotionBoard = observer(() => {
  const emotions = emotionStore.filteredEmotions;
  const { activeIndex, targetIndex, handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchReorder();

  if (emotions.length === 0) {
    return <EmptyBoard />;
  }

  return (
    <div className="select-none">
      <BoardHeader emotionsCount={emotions.length} />

      <DesktopGrid emotions={emotions} />

      <MobileList
        emotions={emotions}
        activeIndex={activeIndex}
        targetIndex={targetIndex}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        handleTouchEnd={handleTouchEnd}
      />
    </div>
  );
});

export default EmotionBoard;
