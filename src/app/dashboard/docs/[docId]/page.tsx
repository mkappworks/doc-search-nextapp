"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrganization } from "@clerk/nextjs";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useQuery } from "convex/react";

import { ChatPanel } from "./chat-panel";
import { DeleteDocButton } from "./delete-doc-button";

export default function DocPage({
  params,
}: {
  params: {
    docId: Id<"docs">;
  };
}) {
  const { organization } = useOrganization();
  const doc = useQuery(api.docs.getDoc, {
    docId: params.docId,
    orgId: organization?.id,
  });

  return (
    <main className="w-full space-y-8 ">
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
          <div className="flex items-center justify-between">
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
                <div className="h-[500px] flex-1 rounded-xl bg-gray-900 p-4">
                  {doc.docUrl && (
                    <iframe className="h-full w-full" src={doc.docUrl} />
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
