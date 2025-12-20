import { useUpdateChatContext } from "@/contexts/chat-context/hooks";
import { Send } from "lucide-react";
import { useState } from "react";

export default function MessageInput({ username }: { username: string }) {
  const [text, setText] = useState("");
  const { sendMessage } = useUpdateChatContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(username, text);
    setText("");
  };

  return (
    <div className=" sticky bottom-0">
      <form
        className=" h-16 flex bg-input border-gray-400 border-t-2 bottom-0 right-0"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="flex-1 py-4 px-6 outline-none"
          autoFocus
          placeholder="Write a message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="py-4 px-6 border-l-2 border-gray-400 bg-gray-200! hover:bg-gray-300!">
          <Send />
        </button>
      </form>
    </div>
  );
}
