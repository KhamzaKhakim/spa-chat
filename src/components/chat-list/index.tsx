import { Link, useRouteContext } from "@tanstack/react-router";
import defaultPfpUrl from "@/assets/default_pfp.jpg";
import type { User } from "@/types";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function ChatList() {
  const { user } = useRouteContext({ from: "__root__" });
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="sm:hidden w-14 border-gray-400 border-r-2 fixed h-full flex items-start justify-center pt-4 z-10 bg-white">
        <button
          onClick={() => setOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open chat list"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div
        className={`sm:hidden bg-sidebar fixed w-full h-full border-gray-400 border-r-2 z-30 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b-2 border-gray-400 flex items-center justify-between px-4">
          <h1 className="text-2xl my-4">Chat App</h1>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close chat list"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col">
          {user.friendUsers?.map((c) => (
            <ChatCard
              key={c.username}
              user={c}
              onClose={() => setOpen(false)}
            />
          ))}
        </div>
      </div>

      <div className="hidden sm:block bg-sidebar fixed w-80 h-full border-gray-400 border-r-2">
        <div className="border-b-2 border-gray-400">
          <h1 className="text-2xl text-center mx-2 my-4">Chat App</h1>
        </div>
        <div className="flex flex-col">
          {user.friendUsers?.map((c) => (
            <ChatCard key={c.username} user={c} />
          ))}
        </div>
      </div>
    </>
  );
}

function ChatCard({ user, onClose }: { user: User; onClose?: () => void }) {
  return (
    <Link
      to="/chats/$username"
      params={{ username: user.username }}
      className="hover:bg-gray-100"
      onClick={onClose}
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
