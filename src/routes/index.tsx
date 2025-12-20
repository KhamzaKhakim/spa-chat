import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    const redirectUser = context.user.friendUsers?.[0].username;

    if (!redirectUser) throw notFound();

    throw redirect({
      to: "/chats/$username",
      params: {
        username: redirectUser,
      },
    });
  },
});
