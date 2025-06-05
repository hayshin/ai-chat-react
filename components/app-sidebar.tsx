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
}

export function AppSidebar({ chats }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          {chats.map((chat) => (
            <ChatPanel key={chat.username} {...chat} />
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
