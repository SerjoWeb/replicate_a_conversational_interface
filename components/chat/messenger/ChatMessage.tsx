import Image from "next/image";

import { MessageSendBy } from "@/mock/messages";
import { cn } from "@/utils/cn";
import { IconType } from "react-icons";

interface ChatMessageProps {
  image: string;
  sender: MessageSendBy;
  name: string;
  message: string;
  time: string;
  icons: { icon: IconType }[];
}

export default function ChatMessage({
  image,
  sender,
  name,
  message,
  time,
  icons
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        "w-full flex",
        sender === MessageSendBy.ME ? "justify-end" : "justify-start"
      )}  
    >
      <div className="flex items-start gap-x-[5px]">
        <Image
          alt="avatar"
          src={image}
          height={41}
          width={40}
          priority
        />

        <div>
          <div
            className={cn(
              "p-[10px] rounded-md min-w-[320px]",
              sender === MessageSendBy.ME ? "bg-puprple-message" : "bg-gray-message"
            )}
          >
            <div className="flex justify-between items-center">
              {sender === MessageSendBy.ME && (
                <div className="flex gap-x-2">
                  {icons.map((item, index) => (
                    <item.icon key={index} className="fill-white" />
                  ))}
                </div>
              )}

              <p
                className={cn(
                  "font-semibold text-lg",
                  sender === MessageSendBy.ME ? "text-white" : "text-black"
                )}
              >
                {name}
              </p>

              {sender !== MessageSendBy.ME && (
                <div className="flex gap-x-2">
                  {icons.map((item, index) => (
                    <item.icon key={index} />
                  ))}
                </div>
              )}
            </div>

            <p className={cn(sender === MessageSendBy.ME ? "text-white" : "text-black")}>
              {message}
            </p>
          </div>

          <p className="text-sm uppercase text-gray-light w-full flex justify-end">
            {time}
          </p>
        </div>
      </div>
    </div>
  );
};
