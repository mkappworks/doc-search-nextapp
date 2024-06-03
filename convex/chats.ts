import { v } from "convex/values";

import { internalMutation, query } from "./_generated/server";

export const getChatsForDocument = query({
  args: {
    docId: v.id("docs"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) return [];

    return await ctx.db
      .query("chats")
      .withIndex("by_docId_tokenIdentifier", (q) =>
        q.eq("docId", args.docId).eq("tokenIdentifier", userId),
      )
      .collect();
  },
});

export const createChatRecord = internalMutation({
  args: {
    docId: v.id("docs"),
    text: v.string(),
    tokenIdentifier: v.string(),
    isHuman: v.boolean(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("chats", {
      docId: args.docId,
      text: args.text,
      isHuman: args.isHuman,
      tokenIdentifier: args.tokenIdentifier,
    });
  },
});
