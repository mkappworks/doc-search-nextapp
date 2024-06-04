"use client";

import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";

import { DocCard } from "@/app/dashboard/docs/doc-card";
import { UploadDocButton } from "@/app/dashboard/docs/upload-doc-button";

export default function DocsPage() {
  const { organization } = useOrganization();
  const docs = useQuery(api.docs.getDocs, {
    orgId: organization?.id ?? "personal",
  });

  return (
    <main className="w-full space-y-8">
      <div className="items-center justify-between flex">
        <h1 className="text-4xl font-bold">My Docs</h1>
        <UploadDocButton />
      </div>
      {!docs && (
        <div className="grid grid-cols-3 gap-8">
          {new Array(8).fill("").map((_, i) => (
            <Card
              key={i}
              className="flex h-[200px] flex-col justify-between p-6"
            >
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[40px] w-[80px] rounded" />
            </Card>
          ))}
        </div>
      )}

      {docs && docs.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-8 py-12">
          <Image
            src="/doc.svg"
            width="200"
            height="200"
            alt="image of empty docs"
          />
          <h2 className="text-2xl">You have no docs</h2>
          <UploadDocButton />
        </div>
      )}

      {docs && docs.length > 0 && (
        <div className="grid grid-cols-3 gap-8">
          {docs?.map((doc) => <DocCard key={doc._id} doc={doc} />)}
        </div>
      )}
    </main>
  );
}
