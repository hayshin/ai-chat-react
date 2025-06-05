import { create } from "zustand";

interface AIChatState {
  // Map username (or chat id) to last response id
  lastResponseIds: Record<string, string | undefined>;
  setLastResponseId: (chatId: string, responseId: string) => void;
  getLastResponseId: (chatId: string) => string | undefined;
  clearLastResponseId: (chatId: string) => void;
  clearAll: () => void;
}

export const useAIChatStore = create<AIChatState>((set, get) => ({
  lastResponseIds: {},
  setLastResponseId: (chatId, responseId) =>
    set((state) => ({
      lastResponseIds: { ...state.lastResponseIds, [chatId]: responseId },
    })),
  getLastResponseId: (chatId) => get().lastResponseIds[chatId],
  clearLastResponseId: (chatId) =>
    set((state) => {
      const updated = { ...state.lastResponseIds };
      delete updated[chatId];
      return { lastResponseIds: updated };
    }),
  clearAll: () => set({ lastResponseIds: {} }),
}));