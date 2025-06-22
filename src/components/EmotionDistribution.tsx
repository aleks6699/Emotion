"use client";
import { Calendar } from "lucide-react";

export const EmotionDistribution = ({
  stats,
  totalEmotions,
  maxCount,
}: {
  stats: { name: string; count: number }[];
  totalEmotions: number;
  maxCount: number;
}) => {
  return (
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
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
                    {count}
                  </span>
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
  );
};