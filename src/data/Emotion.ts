export interface Emotion {
  id: string;
  type: EmotionType;
  comment: string;
  timestamp: number;
  order: number;
}

export interface EmotionType {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  textColor: string;
}

export const EMOTION_TYPES: EmotionType[] = [
  {
    name: 'Радість',
    icon: '😊',
    color: 'from-yellow-400 to-orange-400',
    bgColor: 'bg-gradient-to-br from-yellow-100 to-orange-100',
    textColor: 'text-yellow-800'
  },
  {
    name: 'Смуток',
    icon: '😢',
    color: 'from-blue-400 to-indigo-400',
    bgColor: 'bg-gradient-to-br from-blue-100 to-indigo-100',
    textColor: 'text-blue-800'
  },
  {
    name: 'Злість',
    icon: '😠',
    color: 'from-red-400 to-rose-400',
    bgColor: 'bg-gradient-to-br from-red-100 to-rose-100',
    textColor: 'text-red-800'
  },
  {
    name: 'Подив',
    icon: '😲',
    color: 'from-purple-400 to-pink-400',
    bgColor: 'bg-gradient-to-br from-purple-100 to-pink-100',
    textColor: 'text-purple-800'
  },
  {
    name: 'Спокій',
    icon: '😌',
    color: 'from-green-400 to-emerald-400',
    bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100',
    textColor: 'text-green-800'
  },
  {
    name: 'Страх',
    icon: '😨',
    color: 'from-gray-400 to-slate-400',
    bgColor: 'bg-gradient-to-br from-gray-100 to-slate-100',
    textColor: 'text-gray-800'
  },
  {
    name: 'Любов',
    icon: '😍',
    color: 'from-pink-400 to-rose-400',
    bgColor: 'bg-gradient-to-br from-pink-100 to-rose-100',
    textColor: 'text-pink-800'
  },
  {
    name: 'Втома',
    icon: '😴',
    color: 'from-indigo-400 to-blue-400',
    bgColor: 'bg-gradient-to-br from-indigo-100 to-blue-100',
    textColor: 'text-indigo-800'
  }
];

 export const periodLabels: Record<FilterPeriod, string> = {
  today: "Сьогодні",
  week: "Тиждень",
  month: "Місяць",
};

export type TimeOfDay = 'morning' | 'day' | 'evening';

export type FilterPeriod = 'today' | 'week' | 'month';