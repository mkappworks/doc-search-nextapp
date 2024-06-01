"use client";

import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@convex/_generated/dataModel";

export default function DocPage({
  params,
}: {
  params: {
    docId: Id<"documents">;
  };
}) {
  console.log(params.docId);
  const document = useQuery(api.documents.getDoc, {
    storageId: params.docId,
  });

  if (!document) {
    return <div>You don not have access to view this doc</div>;
  }

  return (
    <main className="p-24 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{document.title}</h1>
      </div>
    </main>
  );
}
