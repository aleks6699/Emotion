import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Trash2, GripVertical } from "lucide-react";
import { Emotion } from "../data/Emotion";
import { emotionStore } from "../stores/EmotionStore";

interface EmotionCardProps {
  emotion: Emotion;
  index: number;
  isDragging?: boolean;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
}

export const EmotionCard = observer(({ emotion, isDragging = false, onTouchStart, onTouchMove, onTouchEnd }: EmotionCardProps) => {
  const [swipeX, setSwipeX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
    onTouchStart?.(e);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;

    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (diff > 0) {
      setSwipeX(Math.min(diff, 120));
    } else {
      setSwipeX(0);
    }

    onTouchMove?.(e);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (swipeX > 80) {
      emotionStore.removeEmotion(emotion.id);
    }

    setSwipeX(0);
    setIsSwiping(false);
    onTouchEnd?.(e);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ${isDragging ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}
      style={{
        transform: `translateX(-${swipeX}px)`,
        transition: isSwiping ? "none" : "transform 0.3s ease",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`
        ${emotion.type.bgColor} 
        backdrop-blur-sm bg-opacity-90 
        rounded-2xl p-6 shadow-lg hover:shadow-xl 
        transition-all duration-300 
        border border-white/20
        group hover:scale-[1.02]
        ${isDragging ? "cursor-grabbing" : "cursor-grab"}
      `}
      >
        <button
          onClick={() => emotionStore.removeEmotion(emotion.id)}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 
                   transition-opacity duration-200 
                   p-2 rounded-full bg-red-500 hover:bg-red-600 
                   text-white shadow-lg hover:shadow-xl
                   hidden md:flex items-center justify-center
                   transform hover:scale-110"
        >
          <Trash2 size={16} />
        </button>

        <div className="flex items-start justify-between mb-4 md:hidden">
          <GripVertical size={20} className="text-gray-400 mt-1" />
          <div className="text-xs text-gray-500">{formatTime(emotion.timestamp)}</div>
        </div>

        <div className="hidden md:block text-xs text-gray-500 mb-4">{formatTime(emotion.timestamp)}</div>

        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{emotion.type.icon}</div>
          <div>
            <h3 className={`text-xl font-bold ${emotion.type.textColor}`}>{emotion.type.name}</h3>
          </div>
        </div>

        {emotion.comment && (
          <p className={`${emotion.type.textColor} text-sm leading-tight overflow-hidden text-ellipsis line-clamp-2 max-h-10`}>
            {emotion.comment}
          </p>
        )}
      </div>

      <div
        className={`
          absolute inset-y-0 right-0 
          bg-red-500 flex items-center justify-center
          transition-all duration-300 md:hidden
          ${swipeX > 0 ? "w-32" : "w-0"}
        `}
      >
        <Trash2 className="text-white" size={24} />
      </div>
    </div>
  );
});
