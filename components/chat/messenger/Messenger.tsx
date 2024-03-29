"use client";

import ChatMessage from "./ChatMessage";
import useWindowSize from "@/hooks/useWindowSize";

import { messagesStore } from "@/mock/messages";
import { cn } from "@/utils/cn";

interface MessengerProps {
  listHeigh: number;
}

export default function Messenger({ listHeigh }: MessengerProps) {
  const size = useWindowSize();

  const { messages } = messagesStore();

  return (
    <div
      className={cn(
        "w-full relative overflow-y-auto",
        size && size.width && size.width > 855 ? "h-[${listHeigh}px]" : "h-full"
      )}
      style={{ height: size && size.width && size.width > 855 ? `${listHeigh}px` : "100%" }}
      id="messages-list"
    >
      <div className="w-full flex flex-col gap-y-[10px] pr-[10px]">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            image={message.image}
            name={message.name}
            message={message.message}
            sender={message.sender}
            time={message.time}
            icons={message.icons}
          />
        ))}
      </div>
    </div>
  );
};
