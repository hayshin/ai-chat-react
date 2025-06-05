import React, { useRef, useState, useEffect } from "react";
import { Message } from "./message";
import { ChatMessage } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";


export interface ChatProps {
  messages: ChatMessage[];
  mainUser: string;
  onSendMessage?: (message: string) => void;
}

export function ChatLayout({ messages, mainUser, onSendMessage }: ChatProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom on new message
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;
    onSendMessage?.(input);
    setInput("");
    textareaRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="flex-1 flex flex-col justify-end overflow-y-auto pb-2">
        {messages.map((msg, idx) => {
          const isMainUser = msg.username === mainUser;
          return (
            <div
              key={idx}
              className={`flex ${isMainUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative rounded-2xl`}
                style={{ maxWidth: "20rem" }}
              >
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
        <div ref={bottomRef} />
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
        />
        <Button
          type="submit"
          size="icon"
          className="self-end"
          disabled={!input.trim()}
          tabIndex={0}
        >
          <Send className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
}
