import { useContext } from "react";
import { ChatContext, UpdateChatContext } from "./context";

export function useChatContext() {
  return useContext(ChatContext);
}

export function useUpdateChatContext() {
  const context = useContext(UpdateChatContext);
  if (!context) {
    throw new Error(
      "useUpdateChatContext must be used within ChatContextProvider"
    );
  }
  return context;
}
