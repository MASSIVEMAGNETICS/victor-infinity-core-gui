import React, { useState } from 'react';
import { ChatMessage, Coords, Sender, ConnectionStatus, ClientMessage, ClientMessageType } from '../types';
import { ChatWindow } from './ChatWindow';
import { InputBar } from './InputBar';
import { CoordinatesInput } from './CoordinatesInput';
import { SpacetimeIcon } from '../constants';

interface ChatTabProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onSend: (message: ClientMessage) => void;
  connectionStatus: ConnectionStatus;
}

export const ChatTab: React.FC<ChatTabProps> = ({ messages, setMessages, onSend, connectionStatus }) => {
  const [inputText, setInputText] = useState('');
  const [showCoords, setShowCoords] = useState(false);
  const [coords, setCoords] = useState<Coords>({ x: 0, y: 0, z: 0, t: 0 });

  const handleSend = () => {
    if (inputText.trim() && connectionStatus === ConnectionStatus.CONNECTED) {
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: inputText,
        sender: Sender.USER,
        ...(showCoords && { coords }),
      };

      const typingMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: '...',
        sender: Sender.AI,
        isTyping: true,
      };

      const messageToSend: ClientMessage = {
        type: ClientMessageType.CHAT,
        payload: {
          prompt: inputText,
          ...(showCoords && { coords }),
        },
      };

      setMessages(prev => [...prev, userMessage, typingMessage]);
      onSend(messageToSend);
      setInputText('');
    }
  };

  const CoordsToggle = (
    <button onClick={() => setShowCoords(s => !s)} className="p-2 rounded-full hover:bg-godcore-dark transition-colors" aria-label="Toggle spacetime coordinates">
      <SpacetimeIcon active={showCoords} />
    </button>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-hidden">
        <ChatWindow messages={messages} />
      </div>
      <div className="flex-shrink-0">
        {showCoords && <CoordinatesInput coords={coords} setCoords={setCoords} />}
        <InputBar
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onSend={handleSend}
          disabled={connectionStatus !== ConnectionStatus.CONNECTED}
          leftControl={CoordsToggle}
        />
      </div>
    </div>
  );
};
