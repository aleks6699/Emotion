import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { X, Plus } from 'lucide-react';
import { emotionStore } from '../stores/EmotionStore';
import { EMOTION_TYPES, EmotionType } from '../data/Emotion';

export const AddEmotionModal = observer(() => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!emotionStore.isModalOpen) {
      setSelectedEmotion(null);
      setComment('');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmotion) {
      emotionStore.addEmotion(selectedEmotion, comment);
      emotionStore.closeModal();
    }
  };

  const handleClose = () => {
    emotionStore.closeModal();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    if (emotionStore.isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [emotionStore.isModalOpen]);

  if (!emotionStore.isModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 modal-backdrop flex items-center justify-center z-[9999] p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white rounded-t-3xl p-6 border-b border-gray-100 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Додати емоцію</h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              type="button"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Оберіть емоцію:
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {EMOTION_TYPES.map((emotionType) => (
                <button
                  key={emotionType.name}
                  type="button"
                  onClick={() => setSelectedEmotion(emotionType)}
                  className={`
                    ${emotionType.bgColor} 
                    p-4 rounded-2xl transition-all duration-200
                    border-2 hover:scale-105 active:scale-95
                    ${selectedEmotion?.name === emotionType.name 
                      ? 'border-blue-500 shadow-lg ring-4 ring-blue-200' 
                      : 'border-transparent hover:shadow-md'
                    }
                  `}
                >
                  <div className="text-3xl mb-2">{emotionType.icon}</div>
                  <div className={`text-sm font-medium ${emotionType.textColor}`}>
                    {emotionType.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Коментар (необов&apos;язково):
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Розкажіть більше про вашу емоцію..."
              className="w-full p-4 border border-gray-200 rounded-2xl resize-none
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200 text-gray-700
                       placeholder-gray-400"
              rows={4}
              maxLength={200}
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              {comment.length}/200
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-4 px-6 border border-gray-200 text-gray-600 
                       rounded-2xl hover:bg-gray-50 transition-all duration-200
                       font-medium"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={!selectedEmotion}
              className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 
                       text-white rounded-2xl hover:from-blue-600 hover:to-purple-700
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200 font-medium
                       flex items-center justify-center gap-2
                       hover:shadow-lg disabled:hover:shadow-none"
            >
              <Plus size={20} />
              Додати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});