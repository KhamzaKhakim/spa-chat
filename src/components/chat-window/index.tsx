import { useChatContext } from "@/contexts/chat-context/hooks";
import type { Message } from "@/types";
import styles from "./ChatWindow.module.css";

export default function ChatWindow({ username }: { username: string }) {
  const messages = useChatContext()[username] || [];
  return (
    <div className="flex-1 bg-gray-300">
      <div className="flex flex-col">
        {messages.map((m) => (
          <MessageCard key={m.text} message={m} />
        ))}
      </div>
    </div>
  );
}

function MessageCard({ message }: { message: Message }) {
  return (
    <div className="flex items-end mt-4 ml-4">
      {/* <div className="size-4 bg-amber-300"></div> */}
      <div className={`flex flex-col bg-gray-100 px-4 py-1  ${styles.message}`}>
        <h6 className="text-md font-bold">{message.from}</h6>
        <div className="flex gap-2 items-end">
          <p className="text-md">{message.text}</p>
          <p className="text-xs text-gray-600">{message.createdAt}</p>
        </div>
      </div>
    </div>
  );
}
