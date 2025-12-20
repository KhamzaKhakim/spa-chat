import { Link, useRouteContext } from "@tanstack/react-router";
import defaultPfpUrl from "@/assets/default_pfp.jpg";
import type { User } from "@/types";

export default function ChatList() {
  const { user } = useRouteContext({ from: "__root__" });

  return (
    <div className="bg-sidebar fixed w-80 h-full border-gray-400 border-r-2">
      <div className="border-b-2 border-gray-400">
        <h1 className="text-2xl text-center mx-2 my-4">Chat App</h1>
      </div>
      <div className="flex flex-col">
        {user.friendUsers?.map((c) => (
          <ChatCard key={c.username} user={c} />
        ))}
      </div>
    </div>
  );
}

function ChatCard({ user }: { user: User }) {
  return (
    <Link
      to="/chats/$username"
      params={{ username: user.username }}
      className="hover:bg-gray-100"
    >
      <div className="flex items-center gap-4 px-4 py-2">
        <img className="size-14 rounded-full" src={defaultPfpUrl} />
        <div className="flex flex-col">
          <h4 className="font-bold">{user.name}</h4>
          <h6 className="text-small text-gray-700">@{user.username}</h6>
        </div>
      </div>
    </Link>
  );
}
