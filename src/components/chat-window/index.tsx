import { useChatContext } from "@/contexts/chat-context/hooks";
import { useEffect, useRef } from "react";
import type { Message } from "@/types";
import styles from "./ChatWindow.module.css";

export default function ChatWindow({ username }: { username: string }) {
  const messages = useChatContext()[username];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const prevUsernameRef = useRef<string>(username);

  useEffect(() => {
    const usernameChanged = prevUsernameRef.current !== username;

    if (usernameChanged) {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
      prevUsernameRef.current = username;
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [username, messages]);

  return (
    <div className="flex-1 bg-gray-300 overflow-y-auto">
      <div className="flex flex-col">
        {messages?.map((m, index) => (
          <MessageCard key={`${m.text}-${index}`} message={m} />
        ))}
        <div ref={messagesEndRef} className="mb-4" />
      </div>
    </div>
  );
}

function MessageCard({ message }: { message: Message }) {
  return (
    <div className="flex items-end mt-4 ml-4">
      <div className={`flex flex-col bg-gray-100 px-4 py-1 ${styles.message}`}>
        <h6 className="text-md font-bold">{message.from}</h6>
        <div className="flex gap-2 items-end max-w-200">
          <p className="text-md wrap-anywhere">{message.text}</p>
          <p className="text-xs text-gray-600">{message.createdAt}</p>
        </div>
      </div>
    </div>
  );
}
