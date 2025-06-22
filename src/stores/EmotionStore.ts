import { makeAutoObservable } from 'mobx';
import { Emotion, EmotionType, FilterPeriod, TimeOfDay } from '../data/Emotion';

const safeLocalStorage = {
  getItem(key: string): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('LocalStorage get error:', e);
      return null;
    }
  },
  setItem(key: string, value: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error('LocalStorage set error:', e);
    }
  }
};

class EmotionStore {
  emotions: Emotion[] = [];
  isModalOpen = false;
  filterPeriod: FilterPeriod = 'today';
  timeOfDay: TimeOfDay = 'day';
  private isInitialized = false;

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  private initialize() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
      this.setTimeOfDay();
      this.isInitialized = true;
    }
  }

  private setTimeOfDay() {
    const hour = new Date().getHours();
    this.timeOfDay = hour >= 6 && hour < 12 ? 'morning' :
                    hour >= 12 && hour < 18 ? 'day' : 'evening';
  }

  get filteredEmotions(): Emotion[] {
    if (!this.isInitialized) return [];

    const now = new Date();
    const filterMap: Record<FilterPeriod, Date> = {
      today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      week: new Date(now.setDate(now.getDate() - now.getDay())),
      month: new Date(now.getFullYear(), now.getMonth(), 1)
    };

    return this.emotions
      .filter(emotion => {
        const emotionDate = new Date(emotion.timestamp);
        return emotionDate >= filterMap[this.filterPeriod];
      })
      .sort((a, b) => a.order - b.order);
  }

  get emotionStats() {
    return Array.from(
      this.filteredEmotions.reduce((stats, em) => {
        stats.set(em.type.name, (stats.get(em.type.name) || 0) + 1);
        return stats;
      }, new Map<string, number>())
    ).map(([name, count]) => ({ name, count }));
  }

  addEmotion = (type: EmotionType, comment: string) => {
    this.emotions.push({
      id: Date.now().toString(),
      type,
      comment,
      timestamp: Date.now(),
      order: this.emotions.length,
    });
    this.saveToStorage();
  };

  removeEmotion = (id: string) => {
    this.emotions = this.emotions.filter(em => em.id !== id);
    this.reorderEmotions();
    this.saveToStorage();
  };

  reorderEmotions = (dragIndex?: number, dropIndex?: number) => {
    if (dragIndex !== undefined && dropIndex !== undefined) {
      const filtered = this.filteredEmotions;
      const dragged = filtered[dragIndex];
      const arr = [...filtered];
      arr.splice(dragIndex, 1);
      arr.splice(dropIndex, 0, dragged);
      
      arr.forEach((em, i) => {
        const original = this.emotions.find(e => e.id === em.id);
        if (original) original.order = i;
      });
    } else {
      this.emotions.forEach((em, i) => em.order = i);
    }
    this.saveToStorage();
  };

  clearAllEmotions = () => {
    this.emotions = [];
    this.saveToStorage();
  };

  openModal = () => this.isModalOpen = true;
  closeModal = () => this.isModalOpen = false;
  setFilterPeriod = (period: FilterPeriod) => this.filterPeriod = period;

  private saveToStorage() {
    safeLocalStorage.setItem('emotions', JSON.stringify(this.emotions));
  }

  private loadFromStorage() {
    const data = safeLocalStorage.getItem('emotions');
    if (data) {
      try {
        this.emotions = JSON.parse(data);
      } catch (e) {
        console.error('Failed to parse emotions:', e);
        this.emotions = [];
      }
    }
  }
}

export const emotionStore = new EmotionStore();