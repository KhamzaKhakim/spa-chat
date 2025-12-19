import type { Message } from "@/types";
import { ChatContext, UpdateChatContext } from "./context";
import { useEffect, useState } from "react";

const STORAGE_KEY = "chat_state";

export default function ChatContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chatState, setChatState] = useState<Record<string, Message[]>>(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  const sendMessage = (username: string, message: string) => {
    const date = new Date();

    setChatState((prev) => ({
      ...prev,
      [username]: [
        ...(prev[username] ?? []),
        {
          from: "You",
          to: username,
          text: message,
          createdAt: `${String(date.getHours()).padStart(2, "0")}:${String(
            date.getMinutes()
          ).padStart(2, "0")}`,
        },
      ],
    }));
  };

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(chatState));
  }, [chatState]);

  return (
    <ChatContext.Provider value={chatState}>
      <UpdateChatContext.Provider value={{ sendMessage }}>
        {children}
      </UpdateChatContext.Provider>
    </ChatContext.Provider>
  );
}
