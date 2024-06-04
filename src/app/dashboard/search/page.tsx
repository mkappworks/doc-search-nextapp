"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { api } from "@convex/_generated/api";
import { FileIcon, NotebookPen } from "lucide-react";

import { SearchForm } from "./search-form";

export default function SearchPage() {
  const [results, setResults] =
    useState<typeof api.search.searchAction._returnType>(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("searchResults");
    if (!storedResults) return;
    setResults(JSON.parse(storedResults));
  }, []);

  return (
    <main className="w-full space-y-8 pb-44">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Search</h1>
      </div>

      <SearchForm
        setResults={(searchResults) => {
          setResults(searchResults);
          localStorage.setItem("searchResults", JSON.stringify(searchResults));
        }}
      />

      <ul className="flex flex-col gap-4">
        {results?.map((result) => {
          if (result.type === "notes") {
            return (
              <SearchResult
                key={result.record._id}
                url={`/dashboard/notes/${result.record._id}`}
                score={result.score}
                text={result.record.text}
              >
                <NotebookPen className="h-5 w-5" />
                Note
              </SearchResult>
            );
          } else {
            return (
              <SearchResult
                key={result.record._id}
                url={`/dashboard/docs/${result.record._id}`}
                score={result.score}
                text={result.record.title + ": " + result.record.description}
              >
                <FileIcon className="h-5 w-5" />
                Doc
              </SearchResult>
            );
          }
        })}
      </ul>
    </main>
  );
}

function SearchResult({
  url,
  score,
  text,
  children,
}: {
  url: string;
  score: number;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={url}>
      <li className="space-y-4 whitespace-pre-line rounded bg-slate-200 p-4 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700">
        <div className="flex items-center justify-between gap-2 text-xl">
          <div className="flex items-center gap-2">{children}</div>
          <div className="text-sm">Relevancy of {score.toFixed(2)}</div>
        </div>
        <div>{text.substring(0, 500) + "..."}</div>
      </li>
    </Link>
  );
}
