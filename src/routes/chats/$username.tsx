import { createFileRoute } from "@tanstack/react-router";
import ChatWindow from "@/components/chat-window";
import MessageInput from "@/components/message-input";

export const Route = createFileRoute("/chats/$username")({
  component: RouteComponent,
});

function RouteComponent() {
  // const { username } = Route.useParams();
  return (
    <div className="flex flex-col min-h-screen">
      <ChatWindow />
      <MessageInput />
    </div>
  );
}
