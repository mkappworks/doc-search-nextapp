"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { btnIconStyles, btnStyles } from "@/styles";
import { Upload } from "lucide-react";

import { UploadDocForm } from "@/app/dashboard/docs/upload-doc-form";

export function UploadDocButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className={btnStyles}>
          <Upload className={btnIconStyles} />
          Upload Doc
        </Button>
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
