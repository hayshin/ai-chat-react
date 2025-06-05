import { create } from "zustand";
import { Chat } from "@/lib/types";

const STORAGE_KEY = "chats";

interface ChatStore {
  chats: Chat[];
  selectedChat: string;
  setChats: (chats: Chat[]) => void;
  setSelectedChat: (username: string) => void;
  sendMessage: (username: string, message: string, mainUser: string) => void;
  loadChats: () => void;
}

const mockChats: Chat[] = [
  {
    username: "alice",
    messages: [
      { username: "alice", message: "Hello! How are you?", time: "10:00" },
      { username: "me", message: "I'm good, thanks! And you?", time: "10:01" },
      { username: "alice", message: "Doing great! Working on a project.", time: "10:02" },
      { username: "me", message: "Nice! Need any help?", time: "10:03" },
      { username: "alice", message: "Maybe later, thanks!", time: "10:04" },
    ],
  },
  {
    username: "bob",
    messages: [
      { username: "bob", message: "Hey!", time: "09:00" },
      { username: "me", message: "Hi Bob!", time: "09:01" },
      { username: "bob", message: "How's your day?", time: "09:02" },
      { username: "me", message: "Pretty good, you?", time: "09:03" },
      { username: "bob", message: "All good here!", time: "09:04" },
    ],
  },
  {
    username: "charlie",
    messages: [
      { username: "charlie", message: "Yo!", time: "08:00" },
      { username: "me", message: "Hey Charlie!", time: "08:01" },
      { username: "charlie", message: "Want to play chess?", time: "08:02" },
      { username: "me", message: "Sure, let's go!", time: "08:03" },
    ],
  },
  {
    username: "dave",
    messages: [
      { username: "dave", message: "Hi!", time: "07:00" },
      { username: "me", message: "Hey Dave!", time: "07:01" },
      { username: "dave", message: "Need help with code?", time: "07:02" },
      { username: "me", message: "Yes, please!", time: "07:03" },
    ],
  },
  {
    username: "eve",
    messages: [
      { username: "eve", message: "Hello!", time: "06:00" },
      { username: "me", message: "Hi Eve!", time: "06:01" },
      { username: "eve", message: "See you later.", time: "06:02" },
      { username: "me", message: "Bye!", time: "06:03" },
    ],
  },
];

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  selectedChat: "alice",
  setChats: (chats) => {
    set({ chats });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  },
  setSelectedChat: (username) => set({ selectedChat: username }),
  sendMessage: (username, message, sender) => {
    const chats = get().chats.map((chat) =>
      chat.username === username
        ? {
            ...chat,
            messages: [
              ...chat.messages,
              {
                username: sender,
                message,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ],
          }
        : chat
    );
    set({ chats });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  },
  loadChats: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    set({ chats: stored ? JSON.parse(stored) : mockChats });
  },
}));