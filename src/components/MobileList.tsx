import { EmotionCard } from "@/components/EmotionCard";
import { Emotion } from "@/data/Emotion";

interface MobileListProps {
  emotions: Emotion[];
  activeIndex: number | null;
  targetIndex: number | null;
  handleTouchStart: (index: number, e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
}

export const MobileList = ({
  emotions,
  activeIndex,
  targetIndex,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
}: MobileListProps) => (
  <div 
    className="md:hidden space-y-4"
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
  >
    {emotions.map((emotion, index) => (
      <div
        key={emotion.id}
        onTouchStart={(e) => handleTouchStart(index, e)}
        className={`
          relative transition-transform duration-200
          ${activeIndex === index ? "scale-95 opacity-80 z-10" : ""}
          ${targetIndex === index ? "translate-y-12" : ""}
        `}
        style={{ 
          animationDelay: `${index * 100}ms`,
          touchAction: 'manipulation'
        }}
      >
        {targetIndex === index && (
          <div className="absolute -top-6 left-0 right-0 mx-auto w-16 h-1.5 bg-blue-500 rounded-full opacity-80"></div>
        )}
        
        <EmotionCard 
          emotion={emotion} 
          index={index} 
          isDragging={activeIndex === index} 
        />
      </div>
    ))}
  </div>
);