import { useChatContext } from "@/contexts/chat-context/hooks";
import { useEffect, useRef } from "react";
import type { Message } from "@/types";
import { useRouteContext } from "@tanstack/react-router";

export default function ChatWindow({ chatPartner }: { chatPartner: string }) {
  const chatState = useChatContext();
  const messages = chatState[chatPartner];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const prevUsernameRef = useRef<string>(chatPartner);

  useEffect(() => {
    const usernameChanged = prevUsernameRef.current !== chatPartner;

    if (usernameChanged) {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
      prevUsernameRef.current = chatPartner;
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatPartner, messages]);

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
  const { user: currentUser } = useRouteContext({ from: "__root__" });

  const myMessage = message.from === currentUser.username;

  return (
    <div className="flex items-end mt-4 ml-4">
      <svg
        className="size-3"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 8 8 L 8 0 Q 8 8 0 8 Z"
          fill={myMessage ? "var(--color-gray-100)" : "var(--color-gray-300)"}
        />
      </svg>
      <div
        className={`flex flex-col ${myMessage ? "bg-gray-100" : "bg-gray-300"} px-4 py-1 rounded-2xl rounded-bl-none`}
      >
        <h6 className="text-md font-bold">{message.from}</h6>
        <div className="flex gap-2 items-end max-w-200">
          <p className="text-md wrap-anywhere">{message.text}</p>
          <p className="text-xs text-gray-600">{message.createdAt}</p>
        </div>
      </div>
    </div>
  );
}
