import { cn } from "@/lib/utils";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { QuestionForm } from "./question-form";

export function ChatPanel({ docId }: { docId: Id<"docs"> }) {
  const chats = useQuery(api.chats.getChatsForDocument, { docId });

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-slate-100 p-6 dark:bg-gray-900">
      <div className="h-[350px] space-y-3 overflow-y-auto">
        <div className="rounded p-3 dark:bg-slate-950">
          AI: Ask any question using AI about this document below:
        </div>
        {chats?.map((chat) => (
          <div
            key={chat._id}
            className={cn(
              {
                "bg-slate-200 dark:bg-slate-800": chat.isHuman,
                "bg-slate-300 dark:bg-slate-950": !chat.isHuman,
                "text-right": chat.isHuman,
              },
              "whitespace-pre-line rounded p-4",
            )}
          >
            {chat.isHuman ? "YOU" : "AI"}: {chat.text}
          </div>
        ))}
      </div>

      <div className="flex gap-1">
        <QuestionForm docId={docId} />
      </div>
    </div>
  );
}
