import type { Message } from "@/types";
import { createContext } from "react";

export const ChatContext = createContext<Record<string, Message[]>>({});

export const UpdateChatContext = createContext<{
  sendMessage: (username: string, message: string) => void;
} | null>(null);
