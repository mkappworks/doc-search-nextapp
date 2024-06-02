"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { LoadingButton } from "@/components/button/loading-button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  note: z.string().min(1).max(2500),
});

export function CreateNoteForm({ onCreate }: { onCreate: () => void }) {
  const createNote = useMutation(api.notes.createNote);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
    },
  });

  const { formState } = form;
  const { isSubmitting } = formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createNote({ text: values.note });
    onCreate();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  rows={8}
                  disabled={isSubmitting}
                  placeholder="Please enter your a note"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton isLoading={isSubmitting} loadingText="Creating...">
          Create
        </LoadingButton>
      </form>
    </Form>
  );
}
