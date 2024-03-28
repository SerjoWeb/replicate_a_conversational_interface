"use client";

import ChatMessage from "./ChatMessage";

import { messagesStore } from "@/mock/messages";

interface MessengerProps {
  listHeigh: number;
}

export default function Messenger({ listHeigh }: MessengerProps) {
  const { messages } = messagesStore();

  return (
    <div className="w-full relative overflow-y-auto py-2" style={{ height: `${listHeigh}px` }} id="messages-list">
      <div className="w-full flex flex-col gap-y-[10px]">
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
