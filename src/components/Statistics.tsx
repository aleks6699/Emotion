import { observer } from "mobx-react-lite";
import { BarChart3, Calendar, TrendingUp } from "lucide-react";
import { emotionStore } from "../stores/EmotionStore";
import { FilterPeriod } from "../data/Emotion";

export const Statistics = observer(() => {
  const allEmotions = emotionStore.allEmotions;
  const filteredEmotions = emotionStore.filteredEmotions;
  
  const allStats = Array.from(
    allEmotions.reduce((stats, em) => {
      stats.set(em.type.name, (stats.get(em.type.name) || 0) + 1);
      return stats;
    }, new Map<string, number>())
  ).map(([name, count]) => ({ name, count }));

  const filteredStats = Array.from(
    filteredEmotions.reduce((stats, em) => {
      stats.set(em.type.name, (stats.get(em.type.name) || 0) + 1);
      return stats;
    }, new Map<string, number>())
  ).map(([name, count]) => ({ name, count }));

  const totalAllEmotions = allEmotions.length;
  const totalFilteredEmotions = filteredEmotions.length;
  const maxCount = Math.max(...filteredStats.map((s) => s.count), 1);

  const periodLabels: Record<FilterPeriod, string> = {
    today: "Сьогодні",
    week: "Тиждень",
    month: "Місяць",
  };

  if (totalAllEmotions === 0) {
    return (
      <section className="text-center py-16" aria-labelledby="no-data-heading">
        <div className="text-6xl mb-6" role="img" aria-label="Іконка статистики">📊</div>
        <h3 id="no-data-heading" className="text-2xl font-bold text-gray-700 mb-4">
          Немає даних для статистики
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Додайте кілька емоцій, щоб побачити статистику вашого емоційного стану
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="statistics-heading">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <BarChart3 size={28} className="text-blue-600" aria-hidden="true" />
          <h2 id="statistics-heading" className="text-2xl font-bold text-gray-800">
            Статистика
          </h2>
        </div>

        <nav aria-label="Фільтр по періоду">
          <div className="flex bg-gray-100 rounded-xl p-1" role="tablist">
            {Object.entries(periodLabels).map(([period, label]) => (
              <button
                key={period}
                onClick={() => emotionStore.setFilterPeriod(period as FilterPeriod)}
                role="tab"
                aria-selected={emotionStore.filterPeriod === period}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${emotionStore.filterPeriod === period
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"}
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <div className="grid gap-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <article
            className="bg-gradient-to-r from-blue-500 to-purple-600 
                       rounded-2xl p-6 text-white"
            aria-labelledby="total-emotions-heading"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={24} aria-hidden="true" />
              <h3 id="total-emotions-heading" className="text-lg font-semibold">
                Загальна кількість
              </h3>
            </div>
            <p className="text-3xl font-bold">
              {totalAllEmotions} {totalAllEmotions === 1 ? "емоція" : "емоцій"}
            </p>
            <p className="text-blue-100 mt-1">За весь час</p>
          </article>

          <article
            className="bg-gradient-to-r from-green-500 to-teal-600 
                       rounded-2xl p-6 text-white"
            aria-labelledby="filtered-emotions-heading"
          >
            <div className="flex items-center gap-3 mb-2">
              <Calendar size={24} aria-hidden="true" />
              <h3 id="filtered-emotions-heading" className="text-lg font-semibold">
                Поточний період
              </h3>
            </div>
            <p className="text-3xl font-bold">
              {totalFilteredEmotions} {totalFilteredEmotions === 1 ? "емоція" : "емоцій"}
            </p>
            <p className="text-green-100 mt-1">
              За період: {periodLabels[emotionStore.filterPeriod].toLowerCase()}
            </p>
          </article>
        </div>
      </div>

      <article className="bg-white rounded-2xl p-6 shadow-lg" aria-labelledby="emotion-distribution-heading">
        <h3 id="emotion-distribution-heading" className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Calendar size={20} aria-hidden="true" />
          Розподіл по типах емоцій ({periodLabels[emotionStore.filterPeriod]})
        </h3>

        <div className="space-y-4">
          {filteredStats.map(({ name, count }) => {
            const percentage = (count / totalFilteredEmotions) * 100;
            const barWidth = (count / maxCount) * 100;

            return (
              <section key={name} aria-labelledby={`emotion-${name}`} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span id={`emotion-${name}`} className="font-medium text-gray-700">
                    {name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500" aria-label={`Процент: ${percentage.toFixed(1)}%`}>
                      {percentage.toFixed(1)}%
                    </span>
                    <span
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold"
                      aria-label={`Кількість: ${count}`}
                    >
                      {count}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-full h-3 overflow-hidden" aria-hidden="true">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-full 
                               rounded-full transition-all duration-1000 ease-out
                               group-hover:from-blue-600 group-hover:to-purple-700"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </section>
            );
          })}
        </div>
      </article>

      <article className="bg-white rounded-2xl p-6 shadow-lg mt-6" aria-labelledby="all-emotion-distribution-heading">
        <h3 id="all-emotion-distribution-heading" className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Calendar size={20} aria-hidden="true" />
          Загальний розподіл по типах емоцій (За весь час)
        </h3>

        <div className="space-y-4">
          {allStats.map(({ name, count }) => {
            const percentage = (count / totalAllEmotions) * 100;
            const allMaxCount = Math.max(...allStats.map((s) => s.count), 1);
            const barWidth = (count / allMaxCount) * 100;

            return (
              <section key={`all-${name}`} aria-labelledby={`all-emotion-${name}`} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span id={`all-emotion-${name}`} className="font-medium text-gray-700">
                    {name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500" aria-label={`Процент: ${percentage.toFixed(1)}%`}>
                      {percentage.toFixed(1)}%
                    </span>
                    <span
                      className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold"
                      aria-label={`Кількість: ${count}`}
                    >
                      {count}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-full h-3 overflow-hidden" aria-hidden="true">
                  <div
                    className="bg-gradient-to-r from-green-500 to-teal-600 h-full 
                               rounded-full transition-all duration-1000 ease-out
                               group-hover:from-green-600 group-hover:to-teal-700"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </section>
            );
          })}
        </div>
      </article>
    </section>
  );
});