import { emotionStore } from "@/stores/EmotionStore";

export const useEmotionStats = () => {
  const stats = emotionStore.emotionStats;
  const totalEmotions = emotionStore.filteredEmotions.length;
  const maxCount = Math.max(...stats.map((s) => s.count), 1);

  return {
    stats,
    totalEmotions,
    maxCount,
  };
};