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
  const currentPath = pathname || "/";

  const linkClass = (href: string) => {
    const isActive = currentPath ? (href === "/" ? currentPath === href : currentPath.startsWith(href)) : false;
    return isActive ? "bg-white text-purple-600 shadow-sm" : "text-gray-600 hover:text-gray-800";
  };

  const timeGreetings = {
    morning: "Доброго ранку!",
    day: "Добрий день!",
    evening: "Доброго вечора!",
  };

  const TimeIcon = timeIcons[timeOfDay];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl text-white">
              <Heart size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Дошка Емоцій</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TimeIcon size={16} />
                {timeGreetings[timeOfDay]}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex bg-gray-100 rounded-xl p-1">
              <Link href="/" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${linkClass("/")}`}>
                Дошка
              </Link>
              <Link href="/stats" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${linkClass("/stats")}`}>
                Статистика
              </Link>
            </div>

            <button
              onClick={emotionStore.openModal}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="sm:hidden pb-4">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <Link
              href="/"
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-200 ${linkClass(
                "/"
              )}`}
            >
              <Heart size={18} /> Дошка
            </Link>
            <Link
              href="/stats"
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-200 ${linkClass(
                "/stats"
              )}`}
            >
              <BarChart3 size={18} /> Статистика
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
});