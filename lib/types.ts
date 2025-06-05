export interface Chat {
  username: string;
  messages: ChatMessage[];
  avatar?: string;
  ai?: boolean; // true if this chat is with AI, false or undefined for human
}
export interface ChatMessage {
  username: string;
  message: string;
  time: string;
}