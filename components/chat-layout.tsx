import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Message } from "./message";
import { Chat, ChatMessage } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Search, X } from "lucide-react";
import { createResponse } from "@/lib/openai";
import { themeClasses } from "@/lib/theme";

export interface ChatLayoutProps {
  chat: Chat;
  mainUser: string;
  onSendMessage?: (message: string, sender: string) => void;
}

export function ChatLayout({ chat, mainUser, onSendMessage }: ChatLayoutProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(chat.messages);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync messages when chat changes
  useEffect(() => {
    setMessages(chat.messages);
  }, [chat]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const results: number[] = [];
      messages.forEach((msg, idx) => {
        if (msg.message.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push(idx);
        }
      });
      setSearchResults(results);
      setCurrentSearchIndex(results.length > 0 ? 0 : -1);
    } else {
      setSearchResults([]);
      setCurrentSearchIndex(-1);
    }
  }, [searchQuery, messages]);

  // Scroll to current search result
  useEffect(() => {
    if (currentSearchIndex >= 0 && searchResults.length > 0) {
      const messageElement = document.getElementById(`message-${searchResults[currentSearchIndex]}`);
      messageElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentSearchIndex, searchResults]);

  // Scroll to bottom on new message
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!searchQuery) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, searchQuery]);

  async function handleSend() {
    if (!input.trim()) return;

    // Add user message
    const newUserMessage: ChatMessage = {
      username: mainUser,
      message: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    onSendMessage?.(input, mainUser);
    setInput("");
    textareaRef.current?.focus();

    // If AI chat, get AI response
    if (chat.ai) {
      setLoading(true);
      try {
        const aiMessageText = await createResponse(
          input,
          chat.username,
        );
        const aiMessage: ChatMessage = {
          username: chat.username,
          message: aiMessageText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, aiMessage]);
        onSendMessage?.(aiMessageText, chat.username);
      } catch (e) {
        setMessages((prev) => [
          ...prev,
          {
            username: chat.username,
            message: "Failed to get AI response.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        console.log(e);
      }
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (searchResults.length > 0) {
        const nextIndex = (currentSearchIndex + 1) % searchResults.length;
        setCurrentSearchIndex(nextIndex);
      }
    }
    if (e.key === "Escape") {
      setShowSearch(false);
      setSearchQuery("");
    }
  }

  function toggleSearch() {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    } else {
      setSearchQuery("");
    }
  }

  return (
    <div className="flex flex-col gap-0 w-full h-full">
      {/* Chat Header */}
      <div className={themeClasses.chatHeader}>
        <div className="flex items-center gap-3 flex-1">

          {chat.avatar ? (
            <Image
              src={chat.avatar}
              alt={chat.username}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
              {chat.username.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">{chat.username}</span>
            {chat.ai && (
              <span className="text-xs text-gray-500">AI Chat</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {showSearch && (
            <div className="flex items-center gap-2">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search messages..."
                className="px-3 py-1 border rounded-md text-sm w-48"
              />
              {searchResults.length > 0 && (
                <span className="text-xs text-gray-500">
                  {currentSearchIndex + 1} of {searchResults.length}
                </span>
              )}
            </div>
          )}
          <button
            onClick={toggleSearch}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Search messages"
          >
            {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 min-h-0 flex flex-col p-2 overflow-y-auto">
        <div className="flex flex-col justify-end flex-1 gap-2">
          {messages.map((msg, idx) => {
            const isMainUser = msg.username === mainUser;
            const isSearchResult = searchResults.includes(idx);
            const isCurrentSearchResult = currentSearchIndex >= 0 && searchResults[currentSearchIndex] === idx;

            return (
              <div
                key={idx}
                id={`message-${idx}`}
                className={`flex w-full ${isMainUser ? "justify-end" : "justify-start"} ${
                  isCurrentSearchResult ? "ring-2 ring-yellow-400 rounded-lg" :
                  isSearchResult ? "ring-1 ring-yellow-200 rounded-lg" : ""
                }`}
              >
                <Message
                  username=""
                  message={msg.message}
                  time={msg.time}
                  theme={isMainUser ? themeClasses.messageOut : themeClasses.messageIn}
                />
              </div>
            );
          })}
          {loading && (
            <div className="flex justify-start">
              <div className={`relative max-w-xs px-4 py-2 mb-2 shadow-sm ${themeClasses.messageIn}`}>
                <div className="animate-pulse h-4 w-24 bg-gray-300 rounded" />
                <span className="absolute right-3 bottom-1 text-xs text-gray-500 pointer-events-none bg-transparent">
                  ...
                </span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Area */}
      <form
        className={`flex items-end gap-2 pt-2 ${themeClasses.inputArea}`}
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
      >
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="resize-none min-h-[40px] max-h-32 flex-1"
          rows={1}
          disabled={loading}
        />
        <Button
          type="submit"
          size="icon"
          className="self-end"
          disabled={!input.trim() || loading}
          tabIndex={0}
        >
          <Send className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
}
