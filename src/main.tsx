import "./index.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  context: {
    user: {
      username: "user",
      name: "You",
      friendUsers: [
        { name: "Bot", username: "bot" },
        { name: "Ghosting friend", username: "friend" },
      ],
    },
  },
  defaultNotFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-4xl font-extrabold">404 Not Found</h2>
    </div>
  ),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
