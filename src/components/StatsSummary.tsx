"use client";
import { TrendingUp } from "lucide-react";
import { emotionStore } from "@/stores/EmotionStore";
import { periodLabels } from "@/data/Emotion";

export const StatsSummary = ({ totalEmotions }: { totalEmotions: number }) => {
  const labelId = "stats-summary-heading";

  return (
    <section
      role="region"
      aria-labelledby={labelId}
      className="bg-gradient-to-r from-blue-500 to-purple-600 
                 rounded-2xl p-6 text-white"
    >
      <div className="flex items-center gap-3 mb-2">
        <TrendingUp size={24} aria-hidden="true" />
        <h3 id={labelId} className="text-lg font-semibold">
          Загальна кількість
        </h3>
      </div>
      <p className="text-3xl font-bold" aria-label={`Загалом: ${totalEmotions}`}>
        {totalEmotions} {totalEmotions === 1 ? "емоція" : "емоцій"}
      </p>
      <p className="text-blue-100 mt-1">
        За період: {periodLabels[emotionStore.filterPeriod].toLowerCase()}
      </p>
    </section>
  );
};
