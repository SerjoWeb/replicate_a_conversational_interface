"use client";

import Image from "next/image";
import LeadStatus from "../conversations/LeadStatus";
import LeadActions from "./LeadActions";

import { leadsStore } from "@/mock/conversations";

export default function Lead() {
  const { conversationLead } = leadsStore();
  
  return (
    <div className="w-full flex justify-between pb-[10px] border-b border-gray-divider">
      <div className="flex gap-x-[10px]">
        <div>
          <Image
            alt="avatar"
            src={conversationLead ? conversationLead.lead.avatar : "/lead.svg"}
            height={41}
            width={40}
            priority
          />
        </div>

        <div>
          <div className="flex gap-x-5">
            <p className="font-semibold">{conversationLead ? conversationLead.lead.name : "Hiro Joyce"}</p>
            <LeadStatus
              color={conversationLead ? conversationLead.tags.color : "#4CAF50"} 
              status={conversationLead ? conversationLead.tags.name : "Qualified Lead"}
            />
          </div>

          <p className="text-sm">Occupation: {conversationLead ? conversationLead.lead.position : "Senior UI/UX Designer"}</p>
          <p className="mt-[5px] text-xs text-gray-text">Company: IT Solutions</p>
          <p className="text-xs text-gray-text">Location: Bangkok</p>
        </div>
      </div>
      <div>
        <LeadActions />
      </div>
    </div>
  );
};
