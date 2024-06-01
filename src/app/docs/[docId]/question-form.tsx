"use client";

import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useAction } from "convex/react";
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
import { LoadingButton } from "@/components/button/loading-button";

const formSchema = z.object({
  question: z.string().min(1).max(250),
});

export function QuestionForm({ docId }: { docId: Id<"docs"> }) {
  const askQuestion = useAction(api.docs.askQuestion);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  const { formState } = form;
  const { isSubmitting } = formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await askQuestion({ question: values.question, docId });
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 gap-3"
      >
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem className="flex-1 ">
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Ask any question over this doc"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton isLoading={isSubmitting} loadingText="Submitting...">
          Upload
        </LoadingButton>
      </form>
    </Form>
  );
}
