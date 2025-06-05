export interface Chat {
  username: string;
  messages: ChatMessage[];
  avatar?: string;
}
export interface ChatMessage {
  username: string;
  message: string;
  time: string;
}