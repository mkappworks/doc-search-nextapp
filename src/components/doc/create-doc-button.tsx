"use client";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadDocForm } from "@/components/doc/upload-doc-form";
import { useState } from "react";

export function CreateDocButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>Upload Doc</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a Doc</DialogTitle>
          <DialogDescription>
            Upload a doc for your team to search on.
          </DialogDescription>
          <UploadDocForm onUpload={() => setIsOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
