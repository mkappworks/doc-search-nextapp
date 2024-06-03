import { mutation, query } from "@convex/_generated/server";
import { ConvexError, v } from "convex/values";

export const getNotes = query({
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) return;

    return await ctx.db
      .query("notes")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .order("desc")
      .collect();
  },
});

export const getNote = query({
  args: {
    noteId: v.id("notes"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) return;

    const note = await ctx.db.get(args.noteId);
    if (!note) return;
    if (note.tokenIdentifier !== userId) return;

    return note;
  },
});

export const createNote = mutation({
  args: {
    text: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new ConvexError("Not authenticated");

    await ctx.db.insert("notes", {
      text: args.text,
      tokenIdentifier: userId,
    });
  },
});

export const deleteNote = mutation({
  args: {
    noteId: v.id("notes"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) return;

    const note = await ctx.db.get(args.noteId);
    if (!note) return;
    if (note.tokenIdentifier !== userId) return;

    await ctx.db.delete(note._id);
  },
});
