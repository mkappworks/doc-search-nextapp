import { mutation, query } from "@convex/_generated/server";
import { ConvexError, v } from "convex/values";

export const getDocuments = query({
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) return [];

    return await ctx.db
      .query("documents")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});

export const getDoc = query({
  args: {
    storageId: v.id("documents"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) return null;

    const doc = await ctx.db.get(args.storageId);

    if (!doc) return null;
    if (doc.tokenIdentifier !== userId) return null;

    return doc;
  },
});

export const createDocument = mutation({
  args: {
    title: v.string(),
    storageId: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    console.log(userId);

    if (!userId) throw new ConvexError("Not authenticated");

    await ctx.db.insert("documents", {
      title: args.title,
      storageId: args.storageId,
      tokenIdentifier: userId,
    });
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
