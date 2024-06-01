import { mutation, query } from "@convex/_generated/server";
import { ConvexError, v } from "convex/values";

export const getDocs = query({
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) return [];

    return await ctx.db
      .query("docs")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});

export const getDoc = query({
  args: {
    docId: v.id("docs"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) return null;

    const doc = await ctx.db.get(args.docId);

    if (!doc) return null;
    if (doc.tokenIdentifier !== userId) return null;

    return { ...doc, docUrl: await ctx.storage.getUrl(doc.docId) };
  },
});

export const createDoc = mutation({
  args: {
    title: v.string(),
    docId: v.id("_storage"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) throw new ConvexError("Not authenticated");

    await ctx.db.insert("docs", {
      title: args.title,
      docId: args.docId,
      tokenIdentifier: userId,
    });
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
