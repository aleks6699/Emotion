"use client";
import { EmotionDistribution } from "@/components/EmotionDistribution";
import { PeriodFilter } from "@/components/PeriodFilter";
import { StatsSummary } from "@/components/StatsSummary";
import { useEmotionStats } from "@/hooks/useEmotionStats";
import { BarChart3 } from "lucide-react";
import { observer } from "mobx-react-lite";

export const Statistics = observer(() => {
  const { stats, totalEmotions, maxCount } = useEmotionStats();

  if (totalEmotions === 0) {
    return <EmptyStatsState />;
  }

  return (
    <section aria-label="Статистика емоцій" className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <BarChart3 size={28} className="text-blue-600" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-gray-800">Статистика</h2>
        </div>
        <PeriodFilter />
      </header>

      <StatsSummary totalEmotions={totalEmotions} />

      <EmotionDistribution stats={stats} totalEmotions={totalEmotions} maxCount={maxCount} />
    </section>
  );
});

const EmptyStatsState = () => (
  <section aria-label="Повідомлення про відсутність статистики" className="text-center py-16">
    <div role="img" aria-label="Іконка графіка" className="text-6xl mb-6">📊</div>
    <h3 className="text-2xl font-bold text-gray-700 mb-4">Немає даних для статистики</h3>
    <p className="text-gray-500 max-w-md mx-auto">
      Додайте кілька емоцій, щоб побачити статистику вашого емоційного стану
    </p>
  </section>
);

export default Statistics;
