import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ChatPanel } from "@/components/chat-panel";
import { Chat } from "@/lib/types";
import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { NewChatModal } from "./new-chat-modal";

interface AppSidebarProps {
  chats: Chat[];
  onChatClick?: (chat: Chat) => void;
  selectedUsername?: string;
}

export function AppSidebar({ chats, onChatClick, selectedUsername }: AppSidebarProps) {
  const [showNewChat, setShowNewChat] = useState(false);

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          {chats.map((chat) => (
            <ChatPanel
              key={chat.username}
              {...chat}
              active={selectedUsername === chat.username}
              onClick={() => onChatClick?.(chat)}
            />
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="relative w-full h-16">
          {/* Modal appears above the button, anchored to the bottom right */}
          {showNewChat && (
            <div className="absolute right-4 bottom-20 z-50 w-[90%] max-w-xs">
              <NewChatModal onClose={() => setShowNewChat(false)} />
            </div>
          )}
          <button
            className="absolute bottom-4 right-4 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:bg-primary/90 transition-colors"
            onClick={() => setShowNewChat((v) => !v)}
            aria-label={showNewChat ? "Close new chat" : "New chat"}
            type="button"
          >
            {showNewChat ? <X className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
