"use client";

import { useParams } from "next/navigation";

import { useOrganization } from "@clerk/nextjs";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useQuery } from "convex/react";

import { DeleteNoteButton } from "./delete-note-button";

export default function NotePage() {
  const { organization } = useOrganization();
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
  const note = useQuery(api.notes.getNote, {
    noteId: noteId,
    orgId: organization?.id ?? "personal",
  });

  if (!note) return;

  return (
    <div className="relative w-full rounded bg-slate-200 p-4 dark:bg-slate-800">
      <DeleteNoteButton noteId={note._id} />

      <div className="whitespace-pre-line pr-3">{note?.text}</div>
    </div>
  );
}
