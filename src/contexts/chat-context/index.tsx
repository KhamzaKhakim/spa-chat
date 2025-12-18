import type { Message } from "@/types";
import { ChatContext, UpdateChatContext } from "./context";
import { useState } from "react";

export default function ChatContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chatState, setChatState] = useState<Record<string, Message[]>>({});

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
          createdAt: `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`,
        },
      ],
    }));
  };

  return (
    <ChatContext.Provider value={chatState}>
      <UpdateChatContext.Provider value={{ sendMessage }}>
        {children}
      </UpdateChatContext.Provider>
    </ChatContext.Provider>
  );
}
