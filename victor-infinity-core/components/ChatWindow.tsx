
import React, { useRef, useEffect } from 'react';
import { ChatMessage as MessageType } from '../types';
import { Message } from './Message';

interface ChatWindowProps {
  messages: MessageType[];
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-grow p-4 md:p-6 space-y-6 overflow-y-auto">
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
      <div ref={scrollRef} />
    </div>
  );
};
