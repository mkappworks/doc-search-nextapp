"use client";

import { LoadingButton } from "@/components/button/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useOrganization } from "@clerk/nextjs";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2).max(250),
  file: z.instanceof(File),
});

export function UploadDocForm({ onUpload }: { onUpload: () => void }) {
  const { organization } = useOrganization();
  const createDoc = useMutation(api.docs.createDoc);
  const generateUploadUrl = useMutation(api.docs.generateUploadUrl);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { formState } = form;
  const { isSubmitting } = formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = await generateUploadUrl();

    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": values.file.type },
      body: values.file,
    });

    const { storageId } = await result.json();
    await createDoc({
      title: values.title,
      storageId: storageId as Id<"_storage">,
      orgId: organization?.id ?? "personal",
    });
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
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".txt,.xml,.doc,.pdf"
                  disabled={isSubmitting}
                  {...fieldProps}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file);
                  }}
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
