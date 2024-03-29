"use client";

import React from "react";
import useWindowSize from "@/hooks/useWindowSize";

import { Menu, MenuItem, Typography } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaLinkedin, FaRegEnvelope } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

export default function LeadActions() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const size = useWindowSize();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex gap-x-[10px]">
      <button
        type="button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <BsThreeDotsVertical size={16} className="fill-gray" />
      </button>
      {size && size.width && size.width > 855 && (
        <button type="button">
          <IoCloseOutline size={22} className="stroke-gray" />
        </button>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose} sx={{ display: "flex", gap: "0 10px" }}>
          <FaLinkedin />
          <Typography variant="body2">View on LinkedIn</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ display: "flex", gap: "0 10px" }}>
          <FaRegEnvelope />
          <Typography variant="body2">Mark as unread</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};
