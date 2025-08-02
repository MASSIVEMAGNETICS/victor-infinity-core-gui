
import React from 'react';
import { ConnectionStatus } from '../types';

interface StatusIndicatorProps {
  status: ConnectionStatus;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const getStatusInfo = () => {
    switch (status) {
      case ConnectionStatus.CONNECTED:
        return {
          color: 'bg-green-500',
          text: 'Online',
        };
      case ConnectionStatus.CONNECTING:
        return {
          color: 'bg-yellow-500 animate-pulse',
          text: 'Connecting...',
        };
      case ConnectionStatus.DISCONNECTED:
        return {
          color: 'bg-red-500',
          text: 'Offline',
        };
      default:
        return {
          color: 'bg-gray-500',
          text: 'Unknown',
        };
    }
  };

  const { color, text } = getStatusInfo();

  return (
    <div className="flex items-center space-x-2">
      <span className={`h-3 w-3 rounded-full ${color}`}></span>
      <span className="text-sm font-medium text-godcore-text-secondary">{text}</span>
    </div>
  );
};
