import React from 'react';
import { ChatMessage, Sender } from '../types';
import { AiIcon, UserIcon } from '../constants';

interface MessageProps {
  message: ChatMessage;
}

const TypingIndicator = () => (
    <div className="flex space-x-1 items-center">
        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
    </div>
);


export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;

  const messageContainerClasses = `flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`;
  const messageBubbleClasses = `max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl shadow-md transition-all duration-300 ${
    isUser
      ? 'bg-godcore-accent text-white rounded-br-none'
      : 'bg-godcore-light text-godcore-text rounded-bl-none'
  }`;

  const CoordsDisplay = () => (
    message.coords ? (
      <div className="mt-2 text-xs text-blue-200/80 font-mono opacity-80 border-t border-blue-200/20 pt-1">
        Coords: (x: {message.coords.x}, y: {message.coords.y}, z: {message.coords.z}, t: {message.coords.t})
      </div>
    ) : null
  );

  return (
    <div className={messageContainerClasses}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-godcore-light flex items-center justify-center">
            <AiIcon />
        </div>
      )}
      <div className={messageBubbleClasses}>
        {message.isTyping ? <TypingIndicator /> : <p className="whitespace-pre-wrap">{message.text}</p>}
        {isUser && <CoordsDisplay />}
      </div>
       {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-godcore-light flex items-center justify-center">
            <UserIcon />
        </div>
      )}
    </div>
  );
};