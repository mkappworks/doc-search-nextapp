"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useQuery } from "convex/react";

import { cn } from "@/lib/utils";

import { CreateNoteButton } from "./create-note-button";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { organization } = useOrganization();
  const notes = useQuery(api.notes.getNotes, {
    orgId: organization?.id ?? "personal",
  });
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();

  return (
    <main className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Notes</h1>
        <CreateNoteButton />
      </div>

      {!notes && (
        <div className="flex gap-12">
          <div className="w-[200px] space-y-4">
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
          </div>

          <div className="flex-1">
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      )}

      {notes?.length === 0 && (
        <div>
          <div className="flex flex-col items-center justify-center gap-8 py-12">
            <Image src="/doc.svg" width="200" height="200" alt="empty doc" />
            <h2 className="text-2xl">You have no notes</h2>
            <CreateNoteButton />
          </div>
        </div>
      )}

      {notes && notes.length > 0 && (
        <div className="flex gap-12">
          <ul className="w-[300px] space-y-2">
            {notes?.map((note) => (
              <li
                key={note._id}
                className={cn(
                  "text-base hover:text-cyan-300 dark:hover:text-cyan-100",
                  {
                    "text-cyan-300": note._id === noteId,
                  },
                )}
              >
                <Link href={`/dashboard/notes/${note._id}`}>
                  {note.text.substring(0, 24) + "..."}
                </Link>
              </li>
            ))}
          </ul>

          <div className="w-full">{children}</div>
        </div>
      )}
    </main>
  );
}
