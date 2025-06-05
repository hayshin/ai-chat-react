import React, { useRef, useState, useEffect } from "react";
import { Message } from "./message";
import { Chat, ChatMessage } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { createResponse } from "@/lib/openai";

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

  // Sync messages when chat changes
  useEffect(() => {
    setMessages(chat.messages);
  }, [chat]);

  // Scroll to bottom on new message
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
          // chat.aiModel || "gpt-4o-mini"
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

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 min-h-0 flex flex-col gap-2 p-2 overflow-y-auto">
          {messages.map((msg, idx) => {
            const isMainUser = msg.username === mainUser;
            return (
              <div
                key={idx}
                className={`flex ${isMainUser ? "justify-end" : "justify-start"}`}
              >
                <div className={`relative rounded-2xl max-w-[100%]`}>
                  <Message
                    username=""
                    message={msg.message}
                    time={msg.time}
                    bgColor={isMainUser ? "bg-purple-300" : "bg-muted text-foreground"}
                  />
                </div>
              </div>
            );
          })}
          {loading && (
            <div className="flex justify-start">
              <div className="relative rounded-2xl bg-muted text-foreground max-w-xs px-4 py-2 mb-2 shadow-sm">
                <div className="animate-pulse h-4 w-24 bg-muted-foreground/30 rounded" />
                <span className="absolute right-3 bottom-1 text-xs text-muted-foreground pointer-events-none bg-transparent">
                  ...
                </span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
      <form
        className="flex items-end gap-2 pt-2 border-t bg-background"
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
