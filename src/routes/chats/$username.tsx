import { createFileRoute, notFound } from "@tanstack/react-router";
import ChatWindow from "@/components/chat-window";
import MessageInput from "@/components/message-input";

export const Route = createFileRoute("/chats/$username")({
  component: RouteComponent,
  loader: ({ context, params }) => {
    if (!context.friendUsers?.includes(params.username)) {
      throw notFound();
    }

    return context.username;
  },
});

function RouteComponent() {
  const { username: chatPartner } = Route.useParams();
  const currentUser = Route.useLoaderData();

  return (
    <div className="flex flex-col min-h-screen">
      <ChatWindow chatPartner={chatPartner} currentUser={currentUser} />
      <MessageInput key={chatPartner} username={chatPartner} />
    </div>
  );
}
