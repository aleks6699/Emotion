import { EmotionCard } from "@/components/EmotionCard";
import { Emotion } from "@/data/Emotion";

export const DesktopGrid = ({ emotions }: { emotions: Emotion[] }) => (
  <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {emotions.map((emotion, index) => (
      <div 
        key={emotion.id} 
        className="animate-fade-in" 
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <EmotionCard emotion={emotion} index={index} />
      </div>
    ))}
  </div>
);