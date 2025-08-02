
import React from 'react';
import { StatusIndicator } from './StatusIndicator';
import { ConnectionStatus } from '../types';

interface HeaderProps {
  status: ConnectionStatus;
}

export const Header: React.FC<HeaderProps> = ({ status }) => {
  return (
    <header className="bg-godcore-darker shadow-lg p-4 flex justify-between items-center border-b border-godcore-light flex-shrink-0">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold text-godcore-text tracking-wider">
          Victor <span className="text-godcore-accent">Infinity-Core</span>
        </h1>
      </div>
      <StatusIndicator status={status} />
    </header>
  );
};
