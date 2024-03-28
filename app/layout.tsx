import type { Metadata } from "next";

import { Nunito } from "next/font/google";
import { cn } from "@/utils/cn";

import "./globals.css";

const nunito = Nunito({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Conversational Interface",
  description: "Replicate a Conversational Interface"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className="w-full h-full">
      <body className={cn(nunito.className, "w-full h-full")}>
        <div className="w-full h-full flex relative overflow-hidden">
          <aside className="h-full bg-puprple-dark" />
          <main className="h-full bg-gray-bg flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
};
