import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import ChatList from "../components/chat-list";
import ChatContextProvider from "@/contexts/chat-context";
import type { User } from "@/types";

const RootLayout = () => {
  return (
    <>
      <ChatList />
      <ChatContextProvider>
        <div className="ml-14 sm:ml-80">
          <Outlet />
        </div>
      </ChatContextProvider>
      {/* <TanStackRouterDevtools /> */}
    </>
  );
};

export const Route = createRootRouteWithContext<{ user: User }>()({
  component: RootLayout,
  loader: ({ context }) => context,
});
