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
    <div className="bg-primary flex-1 overflow-y-auto">
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
      <div
        className={`flex flex-col ${myMessage ? "bg-send-message text-white" : "bg-receive-message border-2 border-gray-200"}
        px-4 py-1 rounded-2xl rounded-bl-none relative`}
      >
        <h6 className="text-md font-bold">{message.from}</h6>
        <div className="flex gap-2 items-end max-w-200 ">
          <p className="text-md wrap-anywhere">{message.text}</p>
          <p
            className={`text-xs ${myMessage ? "text-gray-200" : "text-gray-600"}`}
          >
            {message.createdAt}
          </p>
        </div>
      </div>
    </div>
  );
}
