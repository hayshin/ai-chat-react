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
import { Pencil, X, Search, Filter } from "lucide-react";
import { NewChatModal } from "./new-chat-modal";

interface AppSidebarProps {
  chats: Chat[];
  onChatClick?: (chat: Chat) => void;
  selectedUsername?: string;
}

type FilterType = "nickname" | "time" | "only-ai" | "only-human" | "both";

export function AppSidebar({ chats, onChatClick, selectedUsername }: AppSidebarProps) {
  const [showNewChat, setShowNewChat] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState<FilterType>("both");

  // Filtering logic
  let filteredChats = chats.filter(chat =>
    chat.username.toLowerCase().includes(search.toLowerCase())
  );
  if (filter === "only-ai") filteredChats = filteredChats.filter(chat => chat.ai);
  if (filter === "only-human") filteredChats = filteredChats.filter(chat => !chat.ai);
  if (filter === "nickname") filteredChats = [...filteredChats].sort((a, b) => a.username.localeCompare(b.username));
  if (filter === "time") filteredChats = [...filteredChats].sort((a, b) => {
    const aTime = a.messages[a.messages.length - 1]?.time || "";
    const bTime = b.messages[b.messages.length - 1]?.time || "";
    return bTime.localeCompare(aTime);
  });

  return (
    <Sidebar>
      <SidebarHeader />
      <div className="flex items-center gap-2 px-4 py-2 border-b bg-background">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            className="w-full pl-8 pr-2 py-1 rounded border bg-muted focus:outline-none"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="relative">
          <button
            className="ml-2 p-2 rounded hover:bg-muted transition-colors"
            onClick={() => setShowFilter(v => !v)}
            aria-label="Filter"
            type="button"
          >
            <Filter className="w-5 h-5" />
          </button>
          {showFilter && (
            <div className="absolute right-0 mt-2 z-50 bg-popover border rounded shadow-lg w-48">
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-muted ${filter === "nickname" ? "font-bold" : ""}`}
                onClick={() => { setFilter("nickname"); setShowFilter(false); }}
              >
                Nickname A-Z
              </button>
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-muted ${filter === "time" ? "font-bold" : ""}`}
                onClick={() => { setFilter("time"); setShowFilter(false); }}
              >
                By Time (Newest)
              </button>
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-muted ${filter === "only-ai" ? "font-bold" : ""}`}
                onClick={() => { setFilter("only-ai"); setShowFilter(false); }}
              >
                Only AI
              </button>
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-muted ${filter === "only-human" ? "font-bold" : ""}`}
                onClick={() => { setFilter("only-human"); setShowFilter(false); }}
              >
                Only Human
              </button>
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-muted ${filter === "both" ? "font-bold" : ""}`}
                onClick={() => { setFilter("both"); setShowFilter(false); }}
              >
                Both
              </button>
            </div>
          )}
        </div>
      </div>
      <SidebarContent>
        <SidebarGroup>
          {filteredChats.map((chat) => (
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
