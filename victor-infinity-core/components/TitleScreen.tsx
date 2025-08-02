import React from 'react';

interface TitleScreenProps {
  onEnter: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onEnter }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-godcore-dark via-godcore-darker to-black text-godcore-text font-sans animate-fade-in">
      <div className="text-center animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
        <h1 className="text-5xl md:text-7xl font-bold tracking-wider">
          Victor <span className="text-godcore-accent">Infinity-Core</span>
        </h1>
        <p className="mt-4 text-lg text-godcore-text-secondary">The final form has been achieved.</p>
      </div>
      <button
        onClick={onEnter}
        className="mt-12 px-8 py-3 bg-godcore-accent hover:bg-godcore-accent-hover text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 animate-slide-in-up"
        style={{ animationDelay: '0.5s' }}
      >
        Initialize Connection
      </button>
    </div>
  );
};
