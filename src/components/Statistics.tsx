import { observer } from "mobx-react-lite";
import { BarChart3, Calendar, TrendingUp } from "lucide-react";
import { emotionStore } from "../stores/EmotionStore";
import { FilterPeriod } from "../data/Emotion";

export const Statistics = observer(() => {
  const stats = emotionStore.emotionStats;
  const totalEmotions = emotionStore.filteredEmotions.length;
  const maxCount = Math.max(...stats.map((s) => s.count), 1);

  const periodLabels: Record<FilterPeriod, string> = {
    today: "Сьогодні",
    week: "Тиждень",
    month: "Місяць",
  };

  if (totalEmotions === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">📊</div>
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Немає даних для статистики</h3>
        <p className="text-gray-500 max-w-md mx-auto">Додайте кілька емоцій, щоб побачити статистику вашого емоційного стану</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <BarChart3 size={28} className="text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Статистика</h2>
        </div>

        <div className="flex bg-gray-100 rounded-xl p-1">
          {Object.entries(periodLabels).map(([period, label]) => (
            <button
              key={period}
              onClick={() => emotionStore.setFilterPeriod(period as FilterPeriod)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${emotionStore.filterPeriod === period ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 mb-8">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 
                      rounded-2xl p-6 text-white"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp size={24} />
            <h3 className="text-lg font-semibold">Загальна кількість</h3>
          </div>
          <div className="text-3xl font-bold">
            {totalEmotions} {totalEmotions === 1 ? "емоція" : "емоцій"}
          </div>
          <div className="text-blue-100 mt-1">За період: {periodLabels[emotionStore.filterPeriod].toLowerCase()}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Calendar size={20} />
          Розподіл по типах емоцій
        </h3>

        <div className="space-y-4">
          {stats.map(({ name, count }) => {
            const percentage = (count / totalEmotions) * 100;
            const barWidth = (count / maxCount) * 100;

            return (
              <div key={name} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">{name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{percentage.toFixed(1)}%</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">{count}</span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-full 
                             rounded-full transition-all duration-1000 ease-out
                             group-hover:from-blue-600 group-hover:to-purple-700"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
