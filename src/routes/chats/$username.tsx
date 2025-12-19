import { createFileRoute, notFound } from "@tanstack/react-router";
import ChatWindow from "@/components/chat-window";
import MessageInput from "@/components/message-input";

export const Route = createFileRoute("/chats/$username")({
  component: RouteComponent,
  loader: ({ context, params }) => {
    if (!context.friendUsers?.includes(params.username)) {
      throw notFound();
    }
  },
});

function RouteComponent() {
  const { username } = Route.useParams();

  return (
    <div className="flex flex-col min-h-screen">
      <ChatWindow username={username} />
      <MessageInput key={username} username={username} />
    </div>
  );
}
