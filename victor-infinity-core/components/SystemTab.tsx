import React, { useRef, useEffect } from 'react';
import { ChatMessage, ClientMessage, ClientMessageType, Sender } from '../types';
import { SystemIcon } from '../constants';

interface SystemTabProps {
  logs: ChatMessage[];
  onSend: (message: ClientMessage) => void;
}

export const SystemTab: React.FC<SystemTabProps> = ({ logs, onSend }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleSaveState = () => {
    onSend({
      type: ClientMessageType.SYSTEM,
      payload: {
        command: 'save_state',
      },
    });
  };

  return (
    <div className="p-4 md:p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-godcore-text mb-4">System Control</h2>
      <div className="flex-shrink-0 mb-4">
        <button
          onClick={handleSaveState}
          className="w-full bg-godcore-accent hover:bg-godcore-accent-hover text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Save Model State
        </button>
      </div>
      <div className="flex-grow flex flex-col bg-godcore-dark rounded-lg shadow-inner overflow-hidden">
        <h3 className="text-lg font-semibold text-godcore-text p-3 border-b border-godcore-light">System Log</h3>
        <div className="p-4 space-y-3 overflow-y-auto">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start text-sm font-mono animate-fade-in">
              <SystemIcon />
              <span className="text-godcore-text-secondary mr-2">[{new Date().toLocaleTimeString()}]</span>
              <p className="text-godcore-text">{log.text}</p>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </div>
    </div>
  );
};
