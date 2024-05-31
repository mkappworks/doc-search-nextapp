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
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { LoadingButton } from "@/components/button/loading-button";

const formSchema = z.object({
  title: z.string().min(2).max(250),
});

export function UploadDocForm({ onUpload }: { onUpload: () => void }) {
  const createDocument = useMutation(api.documents.createDocument);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { formState } = form;
  const { isSubmitting } = formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createDocument({ title: values.title });
    onUpload();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Please enter a title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton isLoading={isSubmitting} loadingText="Uploading...">
          Upload
        </LoadingButton>
      </form>
    </Form>
  );
}
