import { Plus } from "lucide-react";
import { emotionStore } from "../stores/EmotionStore";

export const EmptyBoard = () => (
  <div className="text-center py-16">
    <div className="text-6xl mb-6">🎭</div>
    <h3 className="text-2xl font-bold text-gray-700 mb-4">Ваша дошка емоцій порожня</h3>
    <p className="text-gray-500 mb-8 max-w-md mx-auto">
      Почніть додавати емоції, щоб відстежувати свій емоційний стан протягом дня
    </p>
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