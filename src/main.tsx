import "./index.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  context: {
    username: "user",
    name: "You",
    friendUsers: ["bot", "friend"],
  },
  defaultNotFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-4xl font-extrabold">404 Not Found aa</h2>
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
