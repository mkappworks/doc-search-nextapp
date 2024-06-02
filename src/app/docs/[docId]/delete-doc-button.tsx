"use client";

import { Button } from "@/components/ui/button";

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

import { Trash } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { LoadingButton } from "@/components/button/loading-button";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
                  router.push("/");
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
