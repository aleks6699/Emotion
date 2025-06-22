import { useState, useRef } from "react";
import { emotionStore } from "../stores/EmotionStore";

export const useTouchReorder = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const touchStartY = useRef(0);

  const handleTouchStart = (index: number, e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setActiveIndex(index);
    if (window.navigator.vibrate) window.navigator.vibrate(50);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (activeIndex === null) return;
    
    const touchY = e.touches[0].clientY;
    const container = e.currentTarget as HTMLElement;
    const items = Array.from(container.children);
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement;
      const rect = item.getBoundingClientRect();
      const middle = rect.top + rect.height / 2;
      
      if (touchY < middle && i !== activeIndex) {
        setTargetIndex(i);
        return;
      }
    }
    
    setTargetIndex(null);
  };

  const handleTouchEnd = () => {
    if (activeIndex !== null && targetIndex !== null && activeIndex !== targetIndex) {
      emotionStore.reorderEmotions(activeIndex, targetIndex);
    }
    setActiveIndex(null);
    setTargetIndex(null);
  };

  return {
    activeIndex,
    targetIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};