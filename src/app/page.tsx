"use client";

import { UploadDocButton } from "@/components/doc/upload-doc-button";
import { DocCard } from "@/components/doc/doc-card";
import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const docs = useQuery(api.docs.getDocs);

  return (
    <main className="p-24 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Docs</h1>
        <UploadDocButton />
      </div>
      <div className="grid grid-cols-4 gap-8">
        {docs?.map((doc) => <DocCard key={doc._id} doc={doc} />)}
      </div>
    </main>
  );
}
