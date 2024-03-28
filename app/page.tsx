"use client";

import Chat from "@/components/chat/Chat";
import Conversations from "@/components/chat/Conversations";
import Header from "@/components/chat/Header";
import Inbox from "@/components/chat/Inbox";

import { cn } from "@/utils/cn";
import { leadsStore } from "@/mock/conversations";

const blockStyles = "flex-1 bg-white rounded-md p-[15px] h-full border border-gray-divider";

export default function Home() {
  const { conversationLead } = leadsStore();
  
  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      <Header />

      <div className="flex-1 flex flex-col gap-y-[10px] p-[15px]">
        <Inbox />

        <div className="flex-1 flex gap-[10px]">
          <div className={cn(blockStyles)} id="conversations">
            <Conversations />
          </div>

          <div className={cn(blockStyles, "min-w-[400px]")} id="chat">
            {!conversationLead ? (
              <div className="w-full h-full flex justify-center items-center">
                <p>Choose the conversation to start the chat</p>
              </div> 
            ) : (
              <Chat />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
