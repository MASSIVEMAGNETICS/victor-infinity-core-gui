export enum Sender {
  USER = 'user',
  AI = 'ai',
  SYSTEM = 'system',
}

export enum Tab {
  CHAT = 'Chat',
  MODULES = 'Modules',
  SYNTH = 'Synth',
  SYSTEM = 'System',
}

export interface Coords {
  x: number;
  y: number;
  z: number;
  t: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: Sender;
  isTyping?: boolean;
  coords?: Coords;
}

export enum ConnectionStatus {
  CONNECTING,
  CONNECTED,
  DISCONNECTED,
}

// --- WebSocket Message Structures ---

export enum ClientMessageType {
  CHAT = 'chat',
  SYSTEM = 'system',
  SYNTH = 'synth',
}

export interface ClientChatPayload {
  prompt: string;
  coords?: Coords;
}

export interface ClientSystemPayload {
  command: 'save_state' | 'load_module';
  code?: string;
}

export interface ClientSynthPayload {
  prompt: string;
}

export type ClientMessage =
  | { type: ClientMessageType.CHAT; payload: ClientChatPayload }
  | { type: ClientMessageType.SYSTEM; payload: ClientSystemPayload }
  | { type: ClientMessageType.SYNTH; payload: ClientSynthPayload };

export enum ServerMessageType {
    CHAT = 'chat',
    SYNTH = 'synth',
    SYSTEM = 'system',
    ERROR = 'error',
}

export interface ServerChatPayload {
    text: string;
}

export interface ServerSynthPayload {
    audio_b64: string;
    prompt: string;
}

export interface ServerSystemPayload {
    message: string;
}

export interface ServerErrorPayload {
    message: string;
}

export type ServerMessage =
    | { type: ServerMessageType.CHAT; payload: ServerChatPayload }
    | { type: ServerMessageType.SYNTH; payload: ServerSynthPayload }
    | { type: ServerMessageType.SYSTEM; payload: ServerSystemPayload }
    | { type: ServerMessageType.ERROR; payload: ServerErrorPayload };
