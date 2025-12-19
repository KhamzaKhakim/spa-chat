import { useUpdateChatContext } from "@/contexts/chat-context/hooks";
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
    <form
      className="flex h-16 bg-gray-200 border-gray-400 border-t-2"
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
      <button className="py-4 px-6 bg-gray-200 border-l-2">Submit</button>
    </form>
  );
}
