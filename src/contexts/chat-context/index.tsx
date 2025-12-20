import type { Message, User } from "@/types";
import { ChatContext, UpdateChatContext } from "./context";
import { useEffect, useState } from "react";
import { socket } from "@/socket";

const STORAGE_KEY = "chat_state";

export default function ChatContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  const [chatState, setChatState] = useState<Record<string, Message[]>>(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    socket.connect();
    socket.emit("join", user.username);

    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    function onMessage(msg: Message) {
      setChatState((prev) => ({
        ...prev,
        [msg.from]: [...(prev[msg.from] ?? []), msg],
      }));
    }

    socket.on("msg", onMessage);

    return () => {
      socket.off("msg", onMessage);
    };
  }, []);

  const sendMessage = (username: string, message: string) => {
    const date = new Date();

    const newMessage: Message = {
      from: user.username,
      to: username,
      text: message,
      createdAt: `${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
      ).padStart(2, "0")}`,
    };

    setChatState((prev) => ({
      ...prev,
      [username]: [...(prev[username] ?? []), newMessage],
    }));

    socket.timeout(5000).emit("msg", newMessage);
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
