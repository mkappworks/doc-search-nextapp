"use client";

import { useQuery } from "convex/react";
import { CreateNoteButton } from "./create-note-button";
import { api } from "@convex/_generated/api";

export default function NotesPage() {
  const notes = useQuery(api.notes.getNotes);

  return (
    <main className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Notes</h1>
        <CreateNoteButton />
      </div>
      <div>{notes?.map((note) => <div key={note._id}>{note.text}</div>)}</div>
    </main>
  );
}
