import React from "react";
import { Message } from "./message";
import { ChatMessage } from "@/lib/types";


export interface ChatProps {
  messages: ChatMessage[];
  mainUser: string;
}

export function ChatLayout({ messages, mainUser }: ChatProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
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
              <Message username="" message={msg.message} time={msg.time} bgColor={isMainUser
                  ? "bg-purple-300"
                  : "bg-muted text-foreground"} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
