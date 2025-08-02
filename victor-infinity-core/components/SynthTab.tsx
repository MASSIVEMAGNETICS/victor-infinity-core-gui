import React, { useState, useRef, useEffect } from 'react';
import { ClientMessage, ClientMessageType } from '../types';
import { MusicIcon } from '../constants';

interface SynthTabProps {
  onSend: (message: ClientMessage) => void;
  audioData: { src: string; prompt: string } | null;
}

export const SynthTab: React.FC<SynthTabProps> = ({ onSend, audioData }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioData) {
      setIsLoading(false);
      if (audioRef.current) {
        audioRef.current.src = audioData.src;
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
    }
  }, [audioData]);

  const handleSynthesize = () => {
    if (prompt.trim()) {
      setIsLoading(true);
      onSend({
        type: ClientMessageType.SYNTH,
        payload: {
          prompt: prompt,
        },
      });
    }
  };

  return (
    <div className="p-4 md:p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-godcore-text mb-4">Singularity Synth</h2>
      <p className="text-godcore-text-secondary mb-4">
        Generate audio directly from a text prompt using the synthesis core.
      </p>
      <div className="flex-grow flex flex-col bg-godcore-dark rounded-lg shadow-inner">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A cinematic soundtrack with a deep bass line and soaring strings..."
          className="w-full h-full p-4 bg-transparent text-godcore-text text-sm resize-none outline-none"
        />
      </div>
      <button
        onClick={handleSynthesize}
        disabled={!prompt.trim() || isLoading}
        className="mt-4 w-full bg-godcore-accent hover:bg-godcore-accent-hover disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Synthesizing...
          </>
        ) : (
          'Synthesize Audio'
        )}
      </button>

      {audioData && (
        <div className="mt-6 p-4 bg-godcore-light rounded-lg animate-fade-in">
          <p className="text-sm text-godcore-text-secondary mb-2">Last synthesized audio for: <span className="text-godcore-text font-medium">"{audioData.prompt}"</span></p>
          <audio ref={audioRef} controls className="w-full">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};
