"use client";

import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ChatLayout } from "@/components/chat-layout";
import { useChatStore } from "@/store/useChatStore";

export default function Home() {
    const {
        chats,
        selectedChat,
        setSelectedChat,
        sendMessage,
        loadChats,
    } = useChatStore();

    useEffect(() => {
        loadChats();
    }, [loadChats]);

    const currentChat = chats.find((c) => c.username === selectedChat);

    function handleSendMessage(message: string) {
        sendMessage(selectedChat, message, "me");
    }

    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "20rem",
                "--sidebar-width-mobile": "20rem",
            }}
        >
            <AppSidebar
                chats={chats}
                onChatClick={(chat) => setSelectedChat(chat.username)}
                selectedUsername={selectedChat}
            />
            <main className="flex flex-col flex-1 w-full h-screen justify-end items-center">
                <SidebarTrigger />
                <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-3xl flex-1 flex flex-col justify-end pb-4">
                    {currentChat && (
                        <ChatLayout
                            messages={currentChat.messages}
                            mainUser="me"
                            onSendMessage={handleSendMessage}
                        />
                    )}
                </div>
            </main>
        </SidebarProvider>
    );
}
