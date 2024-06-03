"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ClipboardPen, CogIcon, FilesIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function SideNav() {
  const pathName = usePathname();

  return (
    <nav>
      <ul className="space-y-6">
        <li>
          <Link
            className={cn(
              "flex items-center gap-2 text-xl font-light hover:text-cyan-200",
              { "font-bold text-cyan-400": pathName.endsWith("/docs") },
            )}
            href="/dashboard/docs"
          >
            <FilesIcon />
            Docs
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex items-center gap-2 text-xl font-light hover:text-cyan-200",
              { "font-bold text-cyan-400": pathName.endsWith("/notes") },
            )}
            href="/dashboard/notes"
          >
            <ClipboardPen />
            Notes
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex items-center gap-2 text-xl font-light hover:text-cyan-200",
              { "font-bold text-cyan-400": pathName.endsWith("/settings") },
            )}
            href="/dashboard/settings"
          >
            <CogIcon />
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
