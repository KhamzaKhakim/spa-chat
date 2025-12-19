import { useContext } from "react";
import { ChatContext, UpdateChatContext } from "./context";

export function useChatContext() {
  return useContext(ChatContext);
}

export function useUpdateChatContext() {
  const context = useContext(UpdateChatContext);
  if (!context) {
    throw new Error("Provider not found for UpdateChatContext");
  }
  return context;
}
