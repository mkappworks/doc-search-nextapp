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
import { useToast } from "@/components/ui/use-toast";
import { btnIconStyles, btnStyles } from "@/styles";
import { PlusCircleIcon } from "lucide-react";

import { CreateNoteForm } from "./create-note-form";

export function CreateNoteButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className={btnStyles}>
          <PlusCircleIcon className={btnIconStyles} />
          Create Note
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Note</DialogTitle>
          <DialogDescription>
            Type what ever note you want to search for later.
          </DialogDescription>
          <CreateNoteForm
            onCreate={() => {
              setIsOpen(false);
              toast({
                title: "Note created",
                description: "Your note has been created successfully",
              });
            }}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
