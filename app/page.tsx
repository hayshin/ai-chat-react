"use client";

import { useEffect, useState } from "react";
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

    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    useEffect(() => {
        loadChats();
    }, [loadChats]);

    const currentChat = chats.find((c) => c.username === selectedChat);

    function handleSendMessage(message: string, sender: string) {
        sendMessage(selectedChat, message, sender);
    }

    // Minimum distance for a swipe
    const minSwipeDistance = 100;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // Otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        // const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isRightSwipe) {
            // Right swipe (from left edge) - show sidebar
            const sidebarTrigger = document.querySelector(
                '[data-sidebar="trigger"]'
            ) as HTMLElement;
            // if (sidebarTrigger && touchStart < 50) {
                // Only if swipe starts from left edge
                sidebarTrigger.click();
            // }
        }
    };

    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "20rem",
                "--sidebar-width-mobile": "20rem",
            } as React.CSSProperties}
        >
            <AppSidebar
                chats={chats}
                onChatClick={(chat) => setSelectedChat(chat.username)}
                selectedUsername={selectedChat}
            />
            <main
                className="flex flex-col flex-1 w-full h-screen justify-end items-center relative"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="w-full h-screen sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-3xl flex-1 flex flex-col justify-end pb-4">
                    {currentChat && (
                        <ChatLayout
                            chat={currentChat}
                            mainUser="me"
                            onSendMessage={handleSendMessage}
                        />
                    )}
                </div>
                <SidebarTrigger className="absolute bottom-4 left-4 md:hidden bg-white border border-gray-200 rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors">
                    <span className="sr-only">Open sidebar</span>
                </SidebarTrigger>
            </main>
        </SidebarProvider>
    );
}
