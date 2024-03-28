"use client";

import React from "react";
import Lead from "./messenger/Lead";
import Messenger from "./messenger/Messenger";
import MessageForm from "./messenger/MessageForm";

import { Skeleton, Stack } from "@mui/material";

export default function Chat() {
  const [messageWindowHeigh, setMessageWindowHeight] = React.useState<number>(0);

  React.useEffect(() => {
    const chat: HTMLElement | null = document.querySelector("#chat");
    const lead: HTMLElement | null = document.querySelector("#lead");
    const messageForm: HTMLElement | null = document.querySelector("#message-form");

    if (chat && lead && messageForm) {
      setMessageWindowHeight((chat.clientHeight - 30) - (lead.clientHeight + messageForm.clientHeight));
    }
  }, []);

  React.useEffect(() => {}, [messageWindowHeigh]);
  
  return (
    <div className="w-full h-full flex flex-col">
      <div id="lead">
        <Lead />
      </div>

      {messageWindowHeigh !== 0 ? (
        <div
          className="flex-1 relative overflow-hidden border-b border-gray-divider"
          style={{ height: `${messageWindowHeigh}px` }}
        >
          <Messenger listHeigh={messageWindowHeigh} />
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <Stack spacing={1}>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
          </Stack>
        </div>
      )}

      <div id="message-form" className="pt-[20px]">
        <MessageForm />
      </div>
    </div>
  );
};
