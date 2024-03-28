import React from "react";
import Image from "next/image";

import { FiBell, FiMessageSquare, FiPower } from "react-icons/fi";
import { cn } from "@/utils/cn";

interface HeaderManagement {
  icon: React.ReactNode;
  count?: number;
} 

const iconStyles = "stroke-gray-light transition-all duration-500 hover:stroke-black";

const headerManagement: HeaderManagement[] = [
  { icon: <FiBell size={24} className={cn(iconStyles)} />, count: 3 },
  { icon: <FiMessageSquare size={24} className={cn(iconStyles)} />, count: 7 },
  { icon: <Image alt="language" src="/language.svg" height={24} width={24} /> },
  { icon: <FiPower size={24} className={cn(iconStyles)} /> }
];

export default function Header() {
  return (
    <div className="w-full bg-white">
      <div className="w-full flex justify-end items-center p-[15px]">
        <div className="flex gap-x-5">
          {headerManagement.map((option, index) => (
            <button key={index} type="button" className="relative">
              {option.count && (
                <div
                  className={cn(`
                    rounded-full flex justify-center items-center 
                    text-xs text-white bg-blue h-[20px] w-[20px] 
                    aspect-square p-2 absolute -right-2 -top-2
                  `)}
                >
                  {option.count}
                </div>
              )}
              {option.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
