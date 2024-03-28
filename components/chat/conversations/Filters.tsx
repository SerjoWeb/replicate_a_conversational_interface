"use client";

import React from "react";

import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent
} from "@mui/material";

import { STATUSES } from "@/common/constants";
import { RiSendPlane2Fill } from "react-icons/ri";
import { HiOutlineRefresh } from "react-icons/hi";
import { FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { DataLead, leadsStore } from "@/mock/conversations";

interface Action {
  icon: React.ReactNode;
}

interface FiltersProps {
  setConversations: React.Dispatch<React.SetStateAction<DataLead[]>>;
}

const actions: Action[] = [
  { icon: <RiSendPlane2Fill size={18} className="fill-gray-text transition-all duration-500 hover:fill-black" /> },
  { icon: <HiOutlineRefresh size={18} className="stroke-gray-text transition-all duration-500 hover:stroke-black" /> },
  { icon: <FaEnvelope size={18} className="fill-gray-text transition-all duration-500 hover:fill-black" /> },
  { icon: <FaEnvelopeOpen size={16} className="fill-gray-text transition-all duration-500 hover:fill-black" /> },
  { icon: <GoPencil size={18} className="fill-gray-text transition-all duration-500 hover:fill-black" /> }
];

export default function Filters({ setConversations }: FiltersProps) {
  const [search, setSearch] = React.useState<string>("");
  const [campaign, setCampaign] = React.useState<string>("All");
  const [team, setTeam] = React.useState<string>("All");
  const [leadStatus, setLeadStatus] = React.useState<string>("All");

  const [unread, setUnread] = React.useState<boolean>(false);
  const [ureplied, setUreplied] = React.useState<boolean>(false);
  const [drafting, setDrafting] = React.useState<boolean>(false);

  const { leads } = leadsStore();

  const onFilterByStatus = (e: SelectChangeEvent<string>): void => {
    const filteredLeads = e.target.value === "All" ? leads : leads.filter((lead) => lead.tags.name === e.target.value);

    setLeadStatus(e.target.value);
    setConversations(filteredLeads);
  };

  return (
    <div className="w-full flex flex-col gap-y-[20px]">
      <div className="w-full flex justify-between items-center gap-x-[10px]">
        <TextField
          variant="outlined"
          label="Search"
          size="small"
          sx={{ flex: "1 1 0%" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormControl sx={{ flex: "1 1 0%" }} size="small">
          <InputLabel>Campaign</InputLabel>
          <Select
            value={campaign}
            label="Campaign"
            onChange={(e) => setCampaign(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Company 1">Company 1</MenuItem>
            <MenuItem value="Company 2">Company 2</MenuItem>
            <MenuItem value="Company 3">Company 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ flex: "1 1 0%" }} size="small">
          <InputLabel>Team</InputLabel>
          <Select
            value={team}
            label="Team"
            onChange={(e) => setTeam(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Team 1">Team 1</MenuItem>
            <MenuItem value="Team 2">Team 2</MenuItem>
            <MenuItem value="Team 3">Team 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ flex: "1 1 0%" }} size="small">
          <InputLabel>Lead Status</InputLabel>
          <Select
            value={leadStatus}
            label="Lead Status"
            onChange={onFilterByStatus}
          >
            <MenuItem value="All">All</MenuItem>
            {STATUSES.map((status, index) => (
              <MenuItem key={index} value={status.name}>{status.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="w-full flex justify-between items-center">
        <p className="text-sm font-light text-gray-text">Selected: 0</p>
        <div className="flex items-center gap-x-5">
          {actions.map((action, index) => (
            <button key={index} type="button">
              {action.icon}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full flex items-center gap-x-5">
        <FormControlLabel control={<Checkbox checked={unread} onChange={() => setUnread(!unread)} />} label="Unread" />
        <FormControlLabel control={<Checkbox checked={ureplied} onChange={() => setUreplied(!ureplied)} />} label="Ureplied" />
        <FormControlLabel control={<Checkbox checked={drafting} onChange={() => setDrafting(!drafting)} />} label="Drafting" />
      </div>
    </div>
  );
};
