"use client";

import { UploadDocButton } from "@/components/doc/upload-doc-button";
import { DocCard } from "@/components/doc/doc-card";
import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  const docs = useQuery(api.docs.getDocs);

  return (
    <main className="p-24 w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Docs</h1>
        <UploadDocButton />
      </div>
      {!docs && (
        <div className="grid grid-cols-3 gap-8">
          {new Array(8).fill("").map((_, i) => (
            <Card
              key={i}
              className="h-[200px] p-6 flex flex-col justify-between"
            >
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="w-[80px] h-[40px] rounded" />
            </Card>
          ))}
        </div>
      )}

      {docs && docs.length === 0 && (
        <div className="py-12 flex flex-col justify-center items-center gap-8">
          <Image
            src="/doc.svg"
            width="200"
            height="200"
            className="dark:invert"
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
