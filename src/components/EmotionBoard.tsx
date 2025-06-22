import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Plus, Trash2 } from "lucide-react";
import { emotionStore } from "../stores/EmotionStore";
import { EmotionCard } from "./EmotionCard";

export const EmotionBoard = observer(() => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const emotions = emotionStore.filteredEmotions;

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number, e: React.DragEvent) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (index: number, e: React.DragEvent) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      emotionStore.reorderEmotions(draggedIndex, index);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleClearAll = () => {
    emotionStore.clearAllEmotions();
  };

  if (emotions.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">🎭</div>
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Ваша дошка емоцій порожня</h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Почніть додавати емоції, щоб відстежувати свій емоційний стан протягом дня</p>
        <button
          onClick={emotionStore.openModal}
          className="inline-flex items-center gap-3 px-8 py-4 
                   bg-gradient-to-r from-blue-500 to-purple-600 
                   text-white rounded-2xl hover:from-blue-600 hover:to-purple-700
                   transition-all duration-200 font-medium text-lg
                   hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <Plus size={24} />
          Додати першу емоцію
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Моя дошка емоцій</h2>
          <p className="text-gray-600">
            {emotions.length} {emotions.length === 1 ? "емоція" : "емоцій"} додано
          </p>
        </div>
        {emotions.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 
                     text-red-600 hover:bg-red-50 rounded-xl
                     transition-all duration-200 font-medium"
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">Очистити все</span>
          </button>
        )}
      </div>

      <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {emotions.map((emotion, index) => (
          <div key={emotion.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <EmotionCard emotion={emotion} index={index} />
          </div>
        ))}
      </div>

      <div className="md:hidden space-y-4">
        {emotions.map((emotion, index) => (
          <div
            key={emotion.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(index, e)}
            onDrop={(e) => handleDrop(index, e)}
            onDragEnd={() => {
              setDraggedIndex(null);
              setDragOverIndex(null);
            }}
            className={`
              animate-fade-in transition-all duration-200
              ${dragOverIndex === index ? "scale-105" : "scale-100"}
              ${draggedIndex === index ? "opacity-50" : "opacity-100"}
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <EmotionCard emotion={emotion} index={index} isDragging={draggedIndex === index} />
          </div>
        ))}
      </div>
    </div>
  );
});
