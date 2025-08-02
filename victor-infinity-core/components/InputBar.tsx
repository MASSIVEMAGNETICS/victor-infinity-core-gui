import React from 'react';
import { SendIcon } from '../constants';

interface InputBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  disabled: boolean;
  leftControl?: React.ReactNode;
}

export const InputBar: React.FC<InputBarProps> = ({ value, onChange, onSend, disabled, leftControl }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="bg-godcore-darker p-4 border-t border-godcore-light">
      <div className="flex items-center bg-godcore-light rounded-xl p-2 shadow-inner">
        {leftControl && <div className="ml-1 mr-2">{leftControl}</div>}
        <input
          type="text"
          placeholder={disabled ? "Connecting to GODCORE..." : "Message Victor-GPT5..."}
          className="flex-grow bg-transparent text-godcore-text placeholder-godcore-text-secondary outline-none px-3"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <button
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className="bg-godcore-accent hover:bg-godcore-accent-hover disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-lg p-3 transition-colors duration-200"
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};