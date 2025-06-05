import React from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { Chat } from "@/lib/types";

interface ChatPanelProps extends Chat {
  active?: boolean;
  onClick?: () => void;
}

export function ChatPanel({ username, avatar, messages, active, onClick }: ChatPanelProps) {
  const lastMessage = messages.at(-1) || { message: "", time: "" };
  return (
    <div
      className={`flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer ${
        active ? "bg-muted" : ""
      }`}
      onClick={onClick}
    >
      {avatar ? (
        <Image
          src={avatar}
          alt={`${username}'s avatar`}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <User className="w-6 h-6 text-muted-foreground" />
        </div>
      )}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-foreground">{username}</span>
          <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{lastMessage.time}</span>
        </div>
        <span className="text-sm text-muted-foreground truncate block max-w-full">
          {lastMessage.message}
        </span>
      </div>
    </div>
  );
}

