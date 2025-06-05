import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ChatPanel } from "@/components/chat-panel";
import { Chat } from "@/lib/types";

interface AppSidebarProps {
  chats: Chat[];
  onChatClick?: (chat: Chat) => void;
  selectedUsername?: string;
}

export function AppSidebar({ chats, onChatClick, selectedUsername }: AppSidebarProps) {
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
      <SidebarFooter />
    </Sidebar>
  );
}
