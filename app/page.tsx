"use client";

import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ChatLayout } from "@/components/chat-layout";
import { Chat } from "@/lib/types";

// Mock chats
const mockChats: Chat[] = [
	{ username: "alice", lastMessage: "Hello! How are you?", time: "10:00" },
	{ username: "bob", lastMessage: "I'm good, thanks! And you?", time: "10:01" },
	{ username: "charlie", lastMessage: "Doing great! Working on a project.", time: "10:02" },
	{ username: "dave", lastMessage: "Nice! Need any help?", time: "10:03" },
	{ username: "eve", lastMessage: "Maybe later, thanks!", time: "10:04" },
];

// Mock messages per user
const mockMessagesMap: Record<string, { username: string; message: string; time: string }[]> = {
	alice: [
		{ username: "alice", message: "Hello! How are you?", time: "10:00" },
		{ username: "me", message: "I'm good, thanks! And you?", time: "10:01" },
		{ username: "alice", message: "Doing great! Working on a project.", time: "10:02" },
		{ username: "me", message: "Nice! Need any help?", time: "10:03" },
		{ username: "alice", message: "Maybe later, thanks!", time: "10:04" },
	],
	bob: [
		{ username: "bob", message: "Hey!", time: "09:00" },
		{ username: "me", message: "Hi Bob!", time: "09:01" },
		{ username: "bob", message: "How's your day?", time: "09:02" },
		{ username: "me", message: "Pretty good, you?", time: "09:03" },
		{ username: "bob", message: "All good here!", time: "09:04" },
	],
	charlie: [
		{ username: "charlie", message: "Yo!", time: "08:00" },
		{ username: "me", message: "Hey Charlie!", time: "08:01" },
		{ username: "charlie", message: "Want to play chess?", time: "08:02" },
		{ username: "me", message: "Sure, let's go!", time: "08:03" },
	],
	dave: [
		{ username: "dave", message: "Hi!", time: "07:00" },
		{ username: "me", message: "Hey Dave!", time: "07:01" },
		{ username: "dave", message: "Need help with code?", time: "07:02" },
		{ username: "me", message: "Yes, please!", time: "07:03" },
	],
	eve: [
		{ username: "eve", message: "Hello!", time: "06:00" },
		{ username: "me", message: "Hi Eve!", time: "06:01" },
		{ username: "eve", message: "See you later.", time: "06:02" },
		{ username: "me", message: "Bye!", time: "06:03" },
	],
};

export default function Home() {
	// Initial chat is with alice
	const [selectedChat, setSelectedChat] = useState<string>("alice");

	return (
		<SidebarProvider
			style={{
				"--sidebar-width": "20rem",
				"--sidebar-width-mobile": "20rem",
			}}
		>
			<AppSidebar
				chats={mockChats}
				onChatClick={(chat) => setSelectedChat(chat.username)}
				selectedUsername={selectedChat}
			/>
			<main className="flex flex-col flex-1 w-full h-screen justify-end items-center">
				<SidebarTrigger />
				<div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-3xl flex-1 flex flex-col justify-end pb-4">
					<ChatLayout
						messages={mockMessagesMap[selectedChat] || []}
						mainUser="me"
					/>
				</div>
			</main>
		</SidebarProvider>
	);

}
