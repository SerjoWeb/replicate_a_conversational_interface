"use client";

import React from "react";
import ConversationList from "./conversations/ConversationList";
import Filters from "./conversations/Filters";

import { Skeleton, Stack } from "@mui/material";
import { DataLead, leadsStore } from "@/mock/conversations";

export default function Conversations() {
  const { leads } = leadsStore();

  const [listHeigh, setListHeight] = React.useState<number>(0);
  const [conversations, setConversations] = React.useState<DataLead[]>(leads);

  React.useEffect(() => {
    const container: HTMLElement | null = document.querySelector("#conversations");
    const filters: HTMLElement | null = document.querySelector("#filters");

    if (container && filters) {
      setListHeight(container.clientHeight - filters.clientHeight - 30);
    }
  }, []);

  React.useEffect(() => {}, [listHeigh]);

  return (
    <div className="w-full h-full flex flex-col">
      <div id="filters" className="px-4">
        <Filters setConversations={setConversations} />
      </div>

      {listHeigh !== 0 ? (
        <div className="flex-1 relative overflow-hidden" id="list" style={{ height: `${listHeigh}px` }}>
          <ConversationList conversations={conversations} listHeigh={listHeigh} />
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <Stack spacing={1}>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
          </Stack>
        </div>
      )}
    </div>
  );
};
