import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage, ConnectionStatus, Tab, ServerMessage, ServerMessageType, Sender, ClientMessage, ClientMessageType } from './types';
import { Header } from './components/Header';
import { TitleScreen } from './components/TitleScreen';
import { Tabs } from './components/Tabs';
import { ChatTab } from './components/ChatTab';
import { ModulesTab } from './components/ModulesTab';
import { SynthTab } from './components/SynthTab';
import { SystemTab } from './components/SystemTab';

const getWebSocketURL = () => {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const host = window.location.host || 'localhost:8000';
  return `${protocol}://${host}/ws`;
};

const WEBSOCKET_URL = getWebSocketURL();

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.CONNECTING);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.CHAT);
  
  // State for each tab
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [systemLogs, setSystemLogs] = useState<ChatMessage[]>([]);
  const [synthAudio, setSynthAudio] = useState<{src: string, prompt: string} | null>(null);

  const ws = useRef<WebSocket | null>(null);

  const sendWsMessage = useCallback((message: ClientMessage) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected.");
    }
  }, []);

  const connectWebSocket = useCallback(() => {
    console.log(`Attempting to connect to WebSocket at ${WEBSOCKET_URL}...`);
    setStatus(ConnectionStatus.CONNECTING);

    if (ws.current && ws.current.readyState !== WebSocket.CLOSED) {
      ws.current.close();
    }

    ws.current = new WebSocket(WEBSOCKET_URL);

    ws.current.onopen = () => {
      console.log('WebSocket connection established.');
      setStatus(ConnectionStatus.CONNECTED);
      setSystemLogs(prev => [...prev, {id: crypto.randomUUID(), text: 'Connection to Infinity-Core established.', sender: Sender.SYSTEM}]);
    };

    ws.current.onmessage = (event) => {
      try {
        const message: ServerMessage = JSON.parse(event.data);
        console.log('Structured message received:', message);

        // Remove AI typing indicator from chat
        setChatMessages(prev => prev.filter(m => !m.isTyping));

        switch (message.type) {
          case ServerMessageType.CHAT:
            setChatMessages(prev => [...prev, { id: crypto.randomUUID(), text: message.payload.text, sender: Sender.AI }]);
            break;
          case ServerMessageType.SYNTH:
            const audioSrc = `data:audio/wav;base64,${message.payload.audio_b64}`;
            setSynthAudio({ src: audioSrc, prompt: message.payload.prompt });
            setSystemLogs(prev => [...prev, {id: crypto.randomUUID(), text: `Audio synthesis complete for prompt: "${message.payload.prompt}"`, sender: Sender.SYSTEM}]);
            break;
          case ServerMessageType.SYSTEM:
            setSystemLogs(prev => [...prev, {id: crypto.randomUUID(), text: message.payload.message, sender: Sender.SYSTEM}]);
            break;
          case ServerMessageType.ERROR:
            const errorMsg = `Error from server: ${message.payload.message}`;
            console.error(errorMsg);
            setSystemLogs(prev => [...prev, {id: crypto.randomUUID(), text: errorMsg, sender: Sender.SYSTEM}]);
            break;
        }
      } catch (error) {
        // Fallback for non-structured messages
        console.log('Plain text message received:', event.data);
        setChatMessages(prev => {
          const newMessages = prev.filter(m => !m.isTyping);
          return [...newMessages, { id: crypto.randomUUID(), text: event.data, sender: Sender.AI }];
        });
      }
    };

    ws.current.onerror = (event) => {
      console.error('WebSocket error occurred. Check network tab.', event);
      setStatus(ConnectionStatus.DISCONNECTED);
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed.');
      setStatus(ConnectionStatus.DISCONNECTED);
      if (ws.current?.onclose !== null) { // Check if we are intentionally closing
        setSystemLogs(prev => [...prev, {id: crypto.randomUUID(), text: 'Connection to Infinity-Core lost. Reconnecting...', sender: Sender.SYSTEM}]);
        setTimeout(connectWebSocket, 5000);
      }
    };
  }, []);

  useEffect(() => {
    if (isInitialized) {
      connectWebSocket();
    }
    return () => {
      if (ws.current) {
        ws.current.onclose = null; // Prevent reconnect on component unmount
        ws.current.close();
      }
    };
  }, [isInitialized, connectWebSocket]);
  
  if (!isInitialized) {
    return <TitleScreen onEnter={() => setIsInitialized(true)} />;
  }

  const renderActiveTab = () => {
    switch(activeTab) {
      case Tab.CHAT:
        return <ChatTab messages={chatMessages} setMessages={setChatMessages} onSend={sendWsMessage} connectionStatus={status} />;
      case Tab.MODULES:
        return <ModulesTab onSend={sendWsMessage} />;
      case Tab.SYNTH:
        return <SynthTab onSend={sendWsMessage} audioData={synthAudio} />;
      case Tab.SYSTEM:
        return <SystemTab logs={systemLogs} onSend={sendWsMessage} />;
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-godcore-darker text-godcore-text font-sans">
      <Header status={status} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow flex flex-col overflow-hidden bg-gradient-to-br from-godcore-dark via-godcore-darker to-black animate-space-bg" style={{backgroundSize: '200% 200%'}}>
         {renderActiveTab()}
      </main>
    </div>
  );
}
