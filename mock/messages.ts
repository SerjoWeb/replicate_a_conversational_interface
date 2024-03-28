import React from "react";

import { create } from "zustand";
import { FaRegEnvelope, FaLinkedin, FaRegUser } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { IconType } from "react-icons";

export enum MessageSendBy {
  ME = "ME",
  USER = "USER"
}

export interface Message {
  image: string;
  sender: MessageSendBy;
  name: string;
  message: string;
  time: string;
  icons: { icon: IconType }[];
}

export interface MessagesStore {
  messages: Message[];
  setMessages: (message: Message) => void;
}

export function generateRandomIcons(): { icon: IconType; }[] {
  const icons: { icon: IconType; }[] = [
    { icon: FaRegEnvelope },
    { icon: FaLinkedin },
    { icon: FaRegUser },
    { icon: RiRobot2Line }
  ];

  const minIcons = 1;
  const maxIcons = 3;
  const numIcons = Math.floor(Math.random() * (maxIcons - minIcons + 1)) + minIcons;
  const selectedIndices: number[] = [];
  const selectedIcons: { icon: IconType; }[] = [];

  while (selectedIcons.length < numIcons) {
    const randomIndex = Math.floor(Math.random() * icons.length);

    if (!selectedIndices.includes(randomIndex)) {
      selectedIndices.push(randomIndex);
      selectedIcons.push(icons[randomIndex]);
    }
  }

  return selectedIcons;
};

function generateLoremIpsum(): string {
  const loremIpsumText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
  const loremIpsumWords = loremIpsumText.split(' ');
  const startIndex = Math.floor(Math.random() * (loremIpsumWords.length - 10));
  const endIndex = Math.min(startIndex + Math.floor(Math.random() * 10), loremIpsumWords.length);
  const selectedWords = loremIpsumWords.slice(startIndex, endIndex);
  return selectedWords.join(' ');
};

function generateRandomFullName(): string {
  const firstNameList = ['John', 'Emma', 'Michael', 'Sophia', 'Matthew', 'Olivia', 'Daniel', 'Ava', 'David', 'Isabella'];
  const lastNameList = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const firstName = firstNameList[Math.floor(Math.random() * firstNameList.length)];
  const lastName = lastNameList[Math.floor(Math.random() * lastNameList.length)];
  return `${firstName} ${lastName}`;
};

function generateRandomTime(prevTime?: string): string {
  let hour = 0;
  let minute = 0;
  let period = "AM";

  if (prevTime) {
    const [prevHour, prevMinute, prevPeriod] = prevTime.split(/[.: ]/);

    hour = parseInt(prevHour);
    minute = parseInt(prevMinute) + Math.floor(Math.random() * 60);

    if (minute >= 60) {
      hour += 1;
      minute %= 60;
    }

    if (hour >= 12) {
      period = prevPeriod === "AM" ? "PM" : "AM";
      hour %= 12;
    }
  } else {
    hour = Math.floor(Math.random() * 12) + 1;
    minute = Math.floor(Math.random() * 60);
  }

  return `${hour < 10 ? '0' + hour : hour}.${minute < 10 ? '0' + minute : minute} ${period}`;
};

function generateMessages(numMessages: number): Message[] {
  const meName = generateRandomFullName();
  const userName = generateRandomFullName();

  const messages: Message[] = [];

  let prevTime: string | undefined;

  for (let i = 0; i < numMessages; i++) {
    const sender = Math.random() < 0.5 ? MessageSendBy.ME : MessageSendBy.USER;
    const image = sender === MessageSendBy.ME ? "/sender.svg" : "/lead.svg";
    const name = sender === MessageSendBy.ME ? meName : userName;

    const time = generateRandomTime(prevTime);
    prevTime = time;

    const message: Message = {
      image,
      sender,
      name,
      message: generateLoremIpsum().substring(0, 100),
      time,
      icons: generateRandomIcons()
    };
    messages.push(message);
  }

  messages.sort((a, b) => {
    const timeA = new Date(`01/01/2000 ${a.time}`);
    const timeB = new Date(`01/01/2000 ${b.time}`);
    return timeA.getTime() - timeB.getTime();
  });

  return messages;
};

export const messagesStore = create<MessagesStore>()((set) => ({
  messages: generateMessages(5),
  setMessages: (message: Message) => set((state) => ({ messages: [...state.messages, message] }))
}));
