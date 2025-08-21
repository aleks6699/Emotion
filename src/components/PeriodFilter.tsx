"use client";
import { emotionStore } from "@/stores/EmotionStore";
import { FilterPeriod, periodLabels } from "@/data/Emotion";

export const PeriodFilter = () => {
  return (
    <div
      role="radiogroup"
      aria-label="Фільтр по періоду"
      className="flex bg-gray-100 rounded-xl p-1"
    >
      {Object.entries(periodLabels).map(([period, label]) => {
        const isSelected = emotionStore.filterPeriod === period;

        return (
          <button
            key={period}
            role="radio"
            aria-checked={isSelected}
            aria-label={`Період: ${label}`}
            onClick={() => emotionStore.setFilterPeriod(period as FilterPeriod)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${isSelected ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"}
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
