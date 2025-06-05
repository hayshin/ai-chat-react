import React from "react";
import { ChatMessage } from "@/lib/types";

export function Message({ message, time, bgColor = "bg-muted", textColor = "text-foreground" }: ChatMessage & { bgColor?: string; textColor?: string }) {
  return (
    <div className={`relative w-full px-4 py-2 rounded-2xl shadow-sm mb-2 ${bgColor} ${textColor}`}>
      <div className="text-base pr-12 break-words">{message}</div>
      <span className="absolute right-3 bottom-1 text-xs text-muted-foreground pointer-events-none bg-transparent">
        {time}
      </span>
    </div>
  );
}

