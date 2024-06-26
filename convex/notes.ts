import {
  internalAction,
  internalMutation,
  mutation,
  query,
} from "@convex/_generated/server";
import { ConvexError, v } from "convex/values";
import OpenAI from "openai";

import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { hasMembership } from "./memberships";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export const getNotes = query({
  args: {
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) return;

    const membership = await hasMembership(ctx, userId, args.orgId);
    if (!membership) return;

    return await ctx.db
      .query("notes")
      .withIndex("by_membershipId", (q) => q.eq("membershipId", membership._id))
      .order("desc")
      .collect();
  },
});

export const getNote = query({
  args: {
    noteId: v.id("notes"),
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) return;

    const membership = await hasMembership(ctx, userId, args.orgId);
    if (!membership) return;

    const note = await ctx.db.get(args.noteId);
    if (!note) return;

    if (note.membershipId !== membership._id) return;

    return note;
  },
});

export const setNoteEmbedding = internalMutation({
  args: {
    noteId: v.id("notes"),
    embedding: v.array(v.number()),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.noteId, {
      embedding: args.embedding,
    });
  },
});

export const createNoteEmbedding = internalAction({
  args: {
    noteId: v.id("notes"),
    text: v.string(),
  },
  async handler(ctx, args) {
    const embedding = await embed(args.text);

    await ctx.runMutation(internal.notes.setNoteEmbedding, {
      noteId: args.noteId,
      embedding,
    });
  },
});

export const createNote = mutation({
  args: {
    text: v.string(),
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new ConvexError("Not authenticated");

    const membership = await hasMembership(ctx, userId, args.orgId);
    if (!membership) return;

    let noteId: Id<"notes"> = await ctx.db.insert("notes", {
      text: args.text,

      membershipId: membership._id,
    });

    await ctx.scheduler.runAfter(0, internal.notes.createNoteEmbedding, {
      noteId,
      text: args.text,
    });
  },
});

export const deleteNote = mutation({
  args: {
    noteId: v.id("notes"),
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) return;

    const membership = await hasMembership(ctx, userId, args.orgId);
    if (!membership) return;

    const note = await ctx.db.get(args.noteId);
    if (!note) return;
    if (note.membershipId !== membership._id) return;

    await ctx.db.delete(note._id);
  },
});

export async function embed(text: string) {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return embedding.data[0].embedding;
}
