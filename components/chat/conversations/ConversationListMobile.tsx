"use client";

import React from "react";
import Image from "next/image";
import LeadStatus from "./LeadStatus";
import useWindowSize from "@/hooks/useWindowSize";

import { AppBar, Box, Checkbox, Dialog, FormControlLabel, IconButton, Menu, MenuItem, Slide, Toolbar } from "@mui/material";
import { DataLead, leadsStore } from "@/mock/conversations";
import { cn } from "@/utils/cn";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TransitionProps } from "@mui/material/transitions";
import { IoCloseOutline } from "react-icons/io5";
import Chat from "../Chat";

interface ConversationListProps {
  listHeigh: number;
  conversations: DataLead[];
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConversationListMobile({ listHeigh, conversations }: ConversationListProps) {
  const { setConversationlead } = leadsStore();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [choosenLead, setChoosenLead] = React.useState<DataLead | undefined>(undefined);
  const [chatWindow, setChatWindow] = React.useState<boolean>(false);

  const size = useWindowSize();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleCurrentlead = (lead: DataLead): void => {
    if (!choosenLead) {
      setChoosenLead(lead);
      setConversationlead(lead);

      if (size && size.width && size.width <= 855) {
        setChatWindow(true);
      }

      return; 
    }

    setChoosenLead(undefined);
    setConversationlead(undefined);
  };

  const closeChatWindow = (): void => {
    setChoosenLead(undefined);
    setConversationlead(undefined);
    setChatWindow(false);
  };

  return (
    <React.Fragment>
      <div
        className={cn(`w-full relative overflow-y-auto py-2 h-[${listHeigh}px]`)}
        style={{ height: `${listHeigh}px` }}
      >
        <div className="w-full h-full flex flex-col">
          {conversations.map((lead, index) => (
            <div
              key={lead.id || index}
              className={cn(
                `
                w-full flex py-2 px-4 border-t border-gray-divider 
                transition-all duration-500 hover:bg-gray-row-hover
                `,
                choosenLead && choosenLead.id === lead.id && "bg-gray-row-hover"
              )}
            >
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={choosenLead && choosenLead.id === lead.id}
                      onChange={() => toggleCurrentlead(lead)}
                    />
                    }
                    label=""
                  />
              </div>

              <div className="flex gap-x-[15px]">
                <div className="relative">
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
                    src={lead.lead.avatar || "#"}
                    height={41}
                    width={40}
                    priority
                  />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-x-4">
                    <p className="text-sm font-semibold">{lead.lead.name}</p>
                    {size && size.width && size.width > 420 && (
                      <LeadStatus color={lead.tags.color} status={lead.tags.name} />
                    )}
                  </div>

                  <p className="text-xs">{lead.lead.position}</p>
                </div>
              </div>

              <div className="self-center ml-auto">
                <button
                  type="button"
                  aria-controls={open ? "details-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <BsThreeDotsVertical size={16} className="fill-gray" />
                </button>
                <Menu
                  id="details-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  elevation={0}
                  sx={{
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    border: "thin solid #E0E0E0"
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <div className="flex flex-col gap-y-2">
                      <div className="flex gap-x-4">
                        <Image
                          alt="avatar"
                          src={lead.sender || "#"}
                          height={40}
                          width={40}
                          priority
                        />

                        <div>
                          <p className="text-sm font-semibold">Sender</p>
                          {size && size.width && size.width <= 420 && (
                            <LeadStatus color={lead.tags.color} status={lead.tags.name} />
                          )}
                          <p className="text-xs text-gray-text">Campaign: {lead.campaign}</p>
                          <p className="text-xs text-gray-text">Last Message: {lead.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {size && size.width && size.width <= 855 && (
        <Dialog
          fullScreen
          open={chatWindow}
          onClose={closeChatWindow}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={closeChatWindow}
                aria-label="close"
              >
                <IoCloseOutline />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div
            className="h-full w-full flex justify-center items-center p-[15px]"
            id="mobile-chat-container"
          >
            <Chat />
          </div>
        </Dialog>
      )}
    </React.Fragment>
  );
};
