"use client";

import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@convex/_generated/dataModel";

export default function DocPage({
  params,
}: {
  params: {
    docId: Id<"docs">;
  };
}) {
  const doc = useQuery(api.docs.getDoc, {
    docId: params.docId,
  });

  if (!doc) {
    return <div>You don&apos;t have access to view this doc</div>;
  }

  return (
    <main className="p-24 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{doc.title}</h1>
      </div>
      <div className="flex gap-12">
        <div className="bg-gray-900 p-4 rounded flex-1 h-[600px]">
          {doc.docUrl && (
            <iframe className="w-full h-full bg-gray-900" src={doc.docUrl} />
          )}
        </div>
        <div className="w-[300px] bg-gray-900"></div>
      </div>
    </main>
  );
}
