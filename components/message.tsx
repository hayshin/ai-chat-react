import React from "react";
import { ChatMessage } from "@/lib/types";

export function Message({ message, time, theme }: ChatMessage & { theme: string }) {
  return (
    <div className={`${theme}` + " relative p-3 rounded-lg mb-2 break-words"}>
      <div className="text-base pr-12 break-words">{message}</div>
      <span className="absolute right-3 bottom-1 text-xs text-inherit pointer-events-none bg-transparent">
        {time}
      </span>
    </div>
  );
}

