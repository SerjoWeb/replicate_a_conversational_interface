"use client";

import React from "react";
import Image from "next/image";
import LeadStatus from "./LeadStatus";

import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { DataLead, leadsStore } from "@/mock/conversations";
import { cn } from "@/utils/cn";

interface ConversationListProps {
  listHeigh: number;
  conversations: DataLead[];
}

export default function ConversationList({ listHeigh, conversations }: ConversationListProps) {
  const { setConversationlead } = leadsStore();

  const columns: GridColDef<(typeof conversations)[number]>[] = [
    {
      field: "lead",
      headerName: "Lead",
      width: 240,
      cellClassName: "data-grid-cell",
      renderCell: (params: GridRenderCellParams) => {
        if (params.value) {
          return (
            <Box sx={{ display: "flex", gap: "0 15px" }}>
              <Box sx={{ position: "relative" }}>
                <div
                  className={cn(`
                    rounded-full flex justify-center items-center 
                    text-xs text-white bg-orange-dark h-[20px] w-[20px] 
                    aspect-square p-2 absolute -right-2 top-0
                  `)}
                >
                  7
                </div>
                <Image
                  alt="avatar"
                  src={params.value.avatar || "#"}
                  height={41}
                  width={40}
                  priority
                />
              </Box>
              <Box>
                <Typography variant="body1" sx={{ color: "#000000", fontWeight: 600 }}>{params.value.name}</Typography>
                <Typography variant="body2" sx={{ color: "#000000" }}>{params.value.position}</Typography>
              </Box>
            </Box>
          );
        } else {
          return "No Lead";
        }
      }
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 120,
      cellClassName: "data-grid-cell",
      renderCell: (params: GridRenderCellParams) => {
        if (params.value) {
          return (
            <LeadStatus color={params.value.color} status={params.value.name} />
          );
        } else {
          return "No Tags";
        }
      }
    },
    {
      field: "campaign",
      headerName: "Campaign",
      cellClassName: "data-grid-cell",
      width: 200
    },
    {
      field: "sender",
      headerName: "Sender",
      width: 60,
      cellClassName: "data-grid-cell",
      renderCell: (params: GridRenderCellParams) => {
        if (params.value) {
          return (
            <Image
              alt="avatar"
              src={params.value || "#"}
              height={40}
              width={40}
              priority
            />
          );
        } else {
          return "No Tags";
        }
      }
    },
    {
      field: "lastMessage",
      headerName: "Last Message",
      width: 120,
      cellClassName: "data-grid-cell"
    },
    {
      field: "actions",
      headerName: "",
      cellClassName: "data-grid-cell",
      renderCell: () => (
        <button type="button">
          <HiOutlineDotsVertical />
        </button>
      )
    }
  ];

  return (
    <div
      className={cn(`w-full relative overflow-y-auto py-2 h-[${listHeigh}px]`)}
      style={{ height: `${listHeigh}px` }}
    >
      <DataGrid
        sx={{ height: listHeigh, width: "100%", border: "none" }}
        autoHeight={true}
        rows={conversations}
        columns={columns}
        checkboxSelection={true}
        hideFooterPagination={true}
        hideFooter={true}
        onRowSelectionModelChange={(row) => {
          if (conversations.length) {
            if (row.length > 1) {
              const selectionSet = new Set(row);
              const result = row.filter((s) => !selectionSet.has(s));
              setConversationlead(undefined);
            } else {
              const conversationLead = conversations.find((lead) => lead.id === row[0]);
              setConversationlead(conversationLead);
            }
          }
        }}
      />
    </div>
  );
};
