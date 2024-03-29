"use client"

import React from "react";
import Image from "next/image";

import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material";

import { HiPaperAirplane } from "react-icons/hi2";
import { MdInfoOutline } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { FaRegFile } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import { cn } from "@/utils/cn";
import { Message, MessageSendBy, messagesStore } from "@/mock/messages";
import { generateRandomIcons } from "@/mock/messages";

export default function MessageForm() {
  const [replyType, setReplyType] = React.useState("Ice Breaker");
  const [message, setMessage] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const { messages, setMessages } = messagesStore();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setReplyType(event.target.value as string);
  };

  function getTimeFormatted(): string {
    const now: Date = new Date();
    const minutes: number = now.getMinutes();

    let hours: number = now.getHours();
    let meridiem: string = "AM";

    if (hours > 12) {
      hours -= 12;
      meridiem = "PM";
    }

    if (hours === 0) {
      hours = 12;
    }

    const formattedMinutes: string = (minutes < 10) ? `0${minutes}` : minutes.toString();
    const formattedTime: string = `${hours}.${formattedMinutes} ${meridiem}`;

    return formattedTime;
  };

  const onSendMessageHandler = () => {
    if (message !== "") {
      const mock = messages.find((msg) => msg.sender === MessageSendBy.ME);
      const icons = generateRandomIcons();
      
      if (mock) {
        const newMessage: Message = {
          image: mock.image || "/sender.svg",
          sender: MessageSendBy.ME,
          name: mock.name || "Test name",
          message: message,
          time: getTimeFormatted(),
          icons: icons
        };

        setMessages(newMessage);
        setMessage("");
  
        const timeout = setTimeout(() => {
          const messagesList = document.querySelector("#messages-list");
  
          if (messagesList) {
            messagesList.scrollTop = messagesList.scrollHeight;
          }
        }, 0);
  
        return () => clearTimeout(timeout);
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-[10px]">
      <div className="flex justify-between items-center gap-x-[10px]">
        <div className="flex-1">
          <FormControl fullWidth={true} size="small">
            <InputLabel id="demo-simple-select-label">Reply Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={replyType}
              label="Reply Type"
              onChange={handleChange}
            >
              <MenuItem value="Ice Breaker">Ice Breaker</MenuItem>
              <MenuItem value="Ice Breaker 1">Ice Breaker 1</MenuItem>
              <MenuItem value="Ice Breaker 2">Ice Breaker 2</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="flex-1">
          <ButtonGroup
            fullWidth={true}
            variant="contained"
            aria-label="Basic button group"
            size="small"
            sx={{
              backgroundColor: "#7B0035",
              borderColor: "transparent",
              height: "40px"
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "#7B0035 !important",
                borderColor: "transparent !important",
                textTransform: "none",
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "#6F0030"
                }
              }}
            >
              Var 1
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderColor: "#7B0035 !important",
                backgroundColor: "#ffffff !important",
                color: "#7B0035",
                textTransform: "none",
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "#7B0035 !important",
                  color: "#ffffff"
                }
              }}
            >
              Var 2
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#7B0035 !important",
                backgroundColor: "#ffffff !important",
                color: "#7B0035",
                textTransform: "none",
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "#7B0035 !important",
                  color: "#ffffff"
                }
              }}
            >
              Var 3
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="flex flex-col border border-gray-divider rounded-md p-[7px]">
        <div className="w-full flex justify-end">
          <MdInfoOutline
            size={18}
            className="fill-gray cursor-pointer transition-all duration-500 hover:fill-black"
          />
        </div>

        <div className="w-full">
          <textarea
            value={message}
            rows={3}
            placeholder="Enter your message"
            onChange={(event) => setMessage(event.target.value)}
            className="w-full focus:outline-none"
          />
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-x-[5px]">
            <button
              type="button"
              className="p-[4px] border border-gray-divider"
            >
              <Image
                alt="smile"
                src="/smile.svg"
                height={18}
                width={18}
                priority
              />
            </button>
            <button
              type="button"
              className="p-[4px] border border-gray-divider"
              onClick={handleClick}
            >
              <FiPlus size={18} className="stroke-gray-text" />
            </button>
            <Menu
              id="options-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose} sx={{ display: "flex", gap: "0 10px" }}>
                <FaRegFile />
                <Typography variant="body2">Attach file</Typography>
              </MenuItem>
            </Menu>
            <Button
              type="button"
              sx={{
                padding: "4px",
                width: "fit-content",
                minWidth: "auto",
                border: "thin solid rgba(0,0,0,0.23)"
              }}
            >
              <CiImageOn size={18} className="fill-gray-text" />
            </Button>
          </div>

          <button
            type="button"
            className={cn(`
              py-[4px] px-[12px] rounded-full bg-gray-divider 
              flex justify-between items-center shadow-md 
              min-w-[180px] text-sm text-black
            `)}
          >
            Regenerate response
            <TfiReload className="fill-black" />
          </button>
        </div>
      </div>

      <button
        type="button"
        className={cn(`
          w-full flex justify-center items-center gap-x-[10px] 
          bg-puprple-dark text-sm text-white py-2 
          disabled:opacity-75 disabled:cursor-not-allowed 
          rounded-md
        `)}
        onClick={onSendMessageHandler}
        disabled={message === ""}
      >
        <HiPaperAirplane />
        Send
      </button>
    </div>
  );
};
