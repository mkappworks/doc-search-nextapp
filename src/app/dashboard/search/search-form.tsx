"use client";

import { LoadingButton } from "@/components/button/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useOrganization } from "@clerk/nextjs";
import { api } from "@convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  search: z.string().min(1).max(250),
});

export function SearchForm({
  setResults,
}: {
  setResults: (notes: typeof api.search.searchAction._returnType) => void;
}) {
  const { organization } = useOrganization();
  const searchAction = useAction(api.search.searchAction);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const { formState } = form;
  const { isSubmitting } = formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await searchAction({
      search: values.search,
      orgId: organization?.id ?? "personal",
    }).then(setResults);
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
          name="search"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Search over your docs and notes"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton isLoading={isSubmitting} loadingText="Searching...">
          Search
        </LoadingButton>
      </form>
    </Form>
  );
}
