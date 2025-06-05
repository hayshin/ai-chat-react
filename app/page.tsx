import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ChatLayout } from "@/components/chat-layout";
import { Chat } from "@/lib/types";
// Mock data for demonstration

const mockChats: Chat[] = [
  { username: "alice", lastMessage: "Hello! How are you?", time: "10:00" },
  { username: "bob",  lastMessage: "I'm good, thanks! And you?", time: "10:01" },
  { username: "charlie", lastMessage: "Doing great! Working on a project.", time: "10:02" },
  { username: "dave",  lastMessage: "Nice! Need any help?", time: "10:03" },
  { username: "eve",  lastMessage: "Maybe later, thanks!", time: "10:04" },
];
const mockMessages = [
	{ username: "alice", message: "Hello! How are you?", time: "10:00" },
	{ username: "me", message: "I'm good, thanks! And you?", time: "10:01" },
	{ username: "alice", message: "Doing great! Working on a project.", time: "10:02" },
	{ username: "me", message: "Nice! Need any help?", time: "10:03" },
	{ username: "alice", message: "Maybe later, thanks!", time: "10:04" },
];

export default function Home() {
	return (
		<SidebarProvider
			style={{
				"--sidebar-width": "20rem",
				"--sidebar-width-mobile": "20rem",
			}}
		>
			<AppSidebar chats={mockChats}/>
			<main className="flex flex-col flex-1 w-full h-[80vh] justify-end items-center">
				<SidebarTrigger />
				<div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-3xl flex-1 flex flex-col justify-end">
					<ChatLayout messages={mockMessages} mainUser="me" />
				</div>
			</main>
		</SidebarProvider>
	);
}
