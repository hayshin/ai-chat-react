import { useState } from "react";
import { User, Bot } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";

interface NewChatModalProps {
  onClose: () => void;
}

export function NewChatModal({ onClose }: NewChatModalProps) {
  const [step, setStep] = useState<"select" | "form">("select");
  const [chatType, setChatType] = useState<"private" | "ai" | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [aiModel, setAiModel] = useState("gpt-4");

  const { chats, setChats, setSelectedChat } = useChatStore();

  function handleSelect(type: "private" | "ai") {
    setChatType(type);
    setStep("form");
  }

  function handleCreate() {
    if (!name.trim()) return;
    // Prevent duplicate usernames
    if (chats.some(chat => chat.username === name.trim())) {
      alert("Chat with this name already exists.");
      return;
    }
    const newChat = {
      username: name.trim(),
      avatar: avatar || undefined,
      messages: [
        chatType === "ai"
          ? {
              username: name.trim(),
              message: `Hi! I'm ${name.trim()} (${aiModel}) 🤖`,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            }
          : [],
      ].flat(),
      ai: chatType === "ai",
      aiModel: chatType === "ai" ? aiModel : undefined,
    };
    setChats([...chats, newChat]);
    setSelectedChat(name.trim());
    onClose();
  }

  return (
    <div className="bg-popover border rounded-xl shadow-lg p-4 flex flex-col gap-4">
      {step === "select" && (
        <>
          <button
            className="flex items-center gap-2 w-full p-3 rounded-lg hover:bg-muted transition-colors"
            onClick={() => handleSelect("private")}
          >
            <User className="w-5 h-5" />
            New Private Chat
          </button>
          <button
            className="flex items-center gap-2 w-full p-3 rounded-lg hover:bg-muted transition-colors"
            onClick={() => handleSelect("ai")}
          >
            <Bot className="w-5 h-5" />
            New AI Chat
          </button>
        </>
      )}
      {step === "form" && (
        <form
          className="flex flex-col gap-3"
          onSubmit={e => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <div className="flex items-center gap-3">
            <label className="block">
              <span className="text-sm">Avatar</span>
              <input
                type="file"
                accept="image/*"
                className="block mt-1"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => setAvatar(ev.target?.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
            {avatar && (
              <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
            )}
          </div>
          <input
            className="border rounded px-3 py-2"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          {chatType === "ai" && (
            <select
              className="border rounded px-3 py-2"
              value={aiModel}
              onChange={e => setAiModel(e.target.value)}
            >
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5">GPT-3.5</option>
            </select>
          )}
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              className="px-3 py-2 rounded bg-muted text-foreground"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 rounded bg-primary text-primary-foreground"
            >
              Create
            </button>
          </div>
        </form>
      )}
    </div>
  );
}