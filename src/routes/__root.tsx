import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import ChatList from "../components/chat-list";
import ChatContextProvider from "@/contexts/chat-context";

const RootLayout = () => (
  <>
    <ChatList />
    <ChatContextProvider>
      <div className="ml-80">
        <Outlet />
      </div>
    </ChatContextProvider>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-4xl font-extrabold">404 Not Found</h2>
    </div>
  ),
});
