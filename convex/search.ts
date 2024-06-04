import { action } from "@convex/_generated/server";
import { v } from "convex/values";

import { api, internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import { embed } from "./notes";

export const searchAction = action({
  args: {
    search: v.string(),
    orgId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) return;

    const membership = await ctx.runQuery(internal.memberships.getMembership, {
      orgId: args.orgId,
      userId: userId,
    });
    if (!membership) return;

    const embedding = await embed(args.search);

    const filter = (q: any) => q.eq("membershipId", membership._id);

    const noteResults = await ctx.vectorSearch("notes", "by_embedding", {
      vector: embedding,
      limit: 5,
      filter: filter,
    });
    const filteredNotesResults = noteResults.filter(
      (result) => result._score >= 0.1,
    );

    const docsResults = await ctx.vectorSearch("docs", "by_embedding", {
      vector: embedding,
      limit: 5,
      filter,
    });
    const filteredDocsResults = docsResults.filter(
      (result) => result._score >= 0.1,
    );

    const records: (
      | { type: "notes"; score: number; record: Doc<"notes"> }
      | { type: "documents"; score: number; record: Doc<"docs"> }
    )[] = [];

    await Promise.all(
      filteredNotesResults.map(async (result) => {
        const note = await ctx.runQuery(api.notes.getNote, {
          noteId: result._id,
          orgId: args.orgId,
        });
        if (!note) return;

        records.push({
          record: note,
          score: result._score,
          type: "notes",
        });
      }),
    );

    await Promise.all(
      filteredDocsResults.map(async (result) => {
        const doc = await ctx.runQuery(api.docs.getDoc, {
          docId: result._id,
          orgId: args.orgId,
        });
        if (!doc) return;

        records.push({
          record: doc,
          type: "documents",
          score: result._score,
        });
      }),
    );

    records.sort((a, b) => b.score - a.score);

    return records;
  },
});
