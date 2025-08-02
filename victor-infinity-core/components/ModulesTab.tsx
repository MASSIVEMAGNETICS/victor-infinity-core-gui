import React, { useState } from 'react';
import { ClientMessage, ClientMessageType } from '../types';

interface ModulesTabProps {
  onSend: (message: ClientMessage) => void;
}

export const ModulesTab: React.FC<ModulesTabProps> = ({ onSend }) => {
  const [code, setCode] = useState('');

  const handleLoadModule = () => {
    if (code.trim()) {
      onSend({
        type: ClientMessageType.SYSTEM,
        payload: {
          command: 'load_module',
          code: code,
        },
      });
      // Optionally clear the textarea after sending
      // setCode(''); 
    }
  };

  return (
    <div className="p-4 md:p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-godcore-text mb-4">Load Module</h2>
      <p className="text-godcore-text-secondary mb-4">
        Paste a Python class or module below to load it into the active runtime.
      </p>
      <div className="flex-grow flex flex-col bg-godcore-dark rounded-lg shadow-inner">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`class MyCustomModule:\n    def __init__(self):\n        pass\n\n    def execute(self, data):\n        return "Executed" `}
          className="w-full h-full p-4 bg-transparent text-godcore-text font-mono text-sm resize-none outline-none"
        />
      </div>
      <button
        onClick={handleLoadModule}
        disabled={!code.trim()}
        className="mt-4 w-full bg-godcore-accent hover:bg-godcore-accent-hover disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
      >
        Load Module into Core
      </button>
    </div>
  );
};
