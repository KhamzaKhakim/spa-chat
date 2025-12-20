import { createFileRoute, notFound } from "@tanstack/react-router";
import ChatWindow from "@/components/chat-window";
import MessageInput from "@/components/message-input";

export const Route = createFileRoute("/chats/$username")({
  component: RouteComponent,
  loader: ({ context, params }) => {
    if (
      !context.user.friendUsers
        ?.map((u) => u.username)
        .includes(params.username)
    ) {
      throw notFound();
    }
  },
});

function RouteComponent() {
  const { username: chatPartner } = Route.useParams();

  return (
    <div className="flex flex-col min-h-screen">
      <ChatWindow chatPartner={chatPartner} />
      <MessageInput key={chatPartner} username={chatPartner} />
    </div>
  );
}
