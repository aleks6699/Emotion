import { Trash2 } from "lucide-react";
import { emotionStore } from "../stores/EmotionStore";

export const BoardHeader = ({ emotionsCount }: { emotionsCount: number }) => (
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Моя дошка емоцій</h2>
      <p className="text-gray-600">
        {emotionsCount} {emotionsCount === 1 ? "емоція" : "емоцій"} додано
      </p>
    </div>
    {emotionsCount > 0 && (
      <button
        onClick={() => emotionStore.clearAllEmotions()}
        className="flex items-center gap-2 px-4 py-2 
                 text-red-600 hover:bg-red-50 rounded-xl
                 transition-all duration-200 font-medium"
      >
        <Trash2 size={18} />
        <span className="hidden sm:inline">Очистити все</span>
      </button>
    )}
  </div>
);