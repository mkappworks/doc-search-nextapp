"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { LoadingButton } from "@/components/button/loading-button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { btnIconStyles, btnStyles } from "@/styles";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Trash } from "lucide-react";

export function DeleteDocButton({ docId }: { docId: Id<"docs"> }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const deleteDoc = useMutation(api.docs.deleteDoc);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className={btnStyles}>
          <Trash className={btnIconStyles} />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you want to delete this doc?</AlertDialogTitle>
          <AlertDialogDescription>
            Your doc cannot be recovered after been deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton
            onClick={() => {
              setIsLoading(true);
              deleteDoc({ docId })
                .then(() => {
                  router.push("/dashboard/docs");
                })
                .finally(() => {
                  setIsLoading(false);
                });
            }}
            isLoading={isLoading}
            loadingText="Deleting..."
          >
            Delete
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
