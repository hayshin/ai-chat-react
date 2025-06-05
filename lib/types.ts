export interface Chat {
  username: string;
  avatar?: string;
  lastMessage?: string;
  time?: string;
}
export interface ChatMessage {
  username: string;
  message: string;
  time: string;
}