import { create } from "zustand";

export interface Lead {
  avatar: string;
  name: string;
  position: string;
}

export interface Tags {
  name: string;
  color: string;
}

export interface DataLead {
  id: number;
  lead: Lead;
  tags: Tags;
  campaign: string;
  sender: string;
  lastMessage: string;
}

export interface LeadsStore {
  leads: DataLead[];
  conversationLead: DataLead | undefined;
  setConversationlead: (conversationLead: DataLead| undefined) => void;
}

function generateRandomTags(): Tags {
  const tagsList = [
    { name: "Interested", color: "#FF9800" },
    { name: "Qualified Lead", color: "#4CAF50" },
    { name: "Referral", color: "#FFC200" },
    { name: "Not Interested", color: "#B71C1C" },
  ];

  const randomIndex = Math.floor(Math.random() * tagsList.length);
  return tagsList[randomIndex];
};

function generateDataLeads(): DataLead[] {
  const objects: DataLead[] = [];
  const avatar = "/lead.svg";
  const sender = "/sender.svg";

  for (let i = 1; i <= 20; i++) {
    const randomTags = generateRandomTags();
    const object: DataLead = {
      id: i,
      lead: {
        avatar: avatar,
        name: "Hiro Joyce",
        position: "Senior UI/UX Designer"
      },
      tags: randomTags,
      campaign: "UX/UI designer in Bangkok",
      sender: sender,
      lastMessage: "March 27, 2024"
    };

    objects.push(object);
  }

  return objects;
};

export const leadsStore = create<LeadsStore>()((set) => ({
  leads: generateDataLeads(),
  conversationLead: undefined,
  setConversationlead: (conversationLead: DataLead | undefined) => set({ conversationLead })
}));
