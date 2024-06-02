"use client";

import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@convex/_generated/dataModel";
import { ChatPanel } from "./chat-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteDocButton } from "./delete-doc-button";

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

  return (
    <main className="p-24 space-y-8 w-full">
      {!doc && (
        <div className="space-y-8">
          <div>
            <Skeleton className="h-[40px] w-[500px]" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-[40px] w-[80px]" />
            <Skeleton className="h-[40px] w-[80px]" />
          </div>
          <Skeleton className="h-[500px]" />
        </div>
      )}

      {doc && (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">{doc.title}</h1>
            <DeleteDocButton docId={doc._id} />
          </div>

          <div className="flex gap-12">
            <Tabs defaultValue="doc" className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="doc">Doc</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>

              <TabsContent value="doc">
                <div className="bg-gray-900 p-4 rounded-xl flex-1 h-[500px]">
                  {doc.docUrl && (
                    <iframe className="w-full h-full" src={doc.docUrl} />
                  )}
                </div>
              </TabsContent>
              <TabsContent value="chat">
                <ChatPanel docId={doc._id} />
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </main>
  );
}
