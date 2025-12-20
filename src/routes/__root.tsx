import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import ChatList from "../components/chat-list";
import ChatContextProvider from "@/contexts/chat-context";
import type { User } from "@/types";

const RootLayout = () => {
  const user = Route.useLoaderData();
  return (
    <>
      <ChatList />
      <ChatContextProvider user={user}>
        <div className="ml-80">
          <Outlet />
        </div>
      </ChatContextProvider>
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRouteWithContext<User>()({
  component: RootLayout,
  loader: ({ context }) => context,
});
