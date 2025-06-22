"use client";
import { observer } from "mobx-react-lite";
import { Plus, BarChart3, Heart, Sun, Moon } from "lucide-react";
import { emotionStore } from "../stores/EmotionStore";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Header = observer(() => {
  const pathname = usePathname();
  const timeOfDay = emotionStore.timeOfDay;

  const timeIcons = {
    morning: Sun,
    day: Sun,
    evening: Moon,
  };

  const timeGreetings = {
    morning: "Доброго ранку!",
    day: "Добрий день!",
    evening: "Доброго вечора!",
  };

  const currentPath = pathname || "/";
  const TimeIcon = timeIcons[timeOfDay];

  const linkClass = (href: string) => {
    const isActive = currentPath ? (href === "/" ? currentPath === href : currentPath.startsWith(href)) : false;
    return isActive ? "bg-white text-purple-600 shadow-sm aria-current-page" : "text-gray-600 hover:text-gray-800";
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-white/20" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Назва та привітання */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl text-white" aria-hidden="true">
              <Heart size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Дошка Емоцій</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600" aria-label={`Вітання: ${timeGreetings[timeOfDay]}`}>
                <TimeIcon size={16} aria-hidden="true" />
                {timeGreetings[timeOfDay]}
              </div>
            </div>
          </div>

          {/* Навігація + Кнопка */}
          <nav aria-label="Основна навігація" className="flex items-center gap-2">
            <div className="hidden sm:flex bg-gray-100 rounded-xl p-1">
              <Link
                href="/"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${linkClass(
                  "/"
                )}`}
                aria-current={currentPath === "/" ? "page" : undefined}
              >
                Дошка
              </Link>
              <Link
                href="/stats"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${linkClass(
                  "/stats"
                )}`}
                aria-current={currentPath.startsWith("/stats") ? "page" : undefined}
              >
                Статистика
              </Link>
            </div>

            <button
              onClick={emotionStore.openModal}
              aria-label="Додати нову емоцію"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Plus size={20} />
            </button>
          </nav>
        </div>

        {/* Мобільна навігація */}
        <nav aria-label="Мобільна навігація" className="sm:hidden pb-4">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <Link
              href="/"
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${linkClass(
                "/"
              )}`}
              aria-current={currentPath === "/" ? "page" : undefined}
            >
              <Heart size={18} aria-hidden="true" /> Дошка
            </Link>
            <Link
              href="/stats"
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${linkClass(
                "/stats"
              )}`}
              aria-current={currentPath.startsWith("/stats") ? "page" : undefined}
            >
              <BarChart3 size={18} aria-hidden="true" /> Статистика
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
});
