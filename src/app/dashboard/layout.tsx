import type { Metadata } from "next";

import { SideNav } from "./side-nav";

export const metadata: Metadata = {
  title: "Document Searching - Dashbaord",
  description: "Dashbaord",
};

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto flex gap-24 pt-12">
      <SideNav />
      {children}
    </div>
  );
}
