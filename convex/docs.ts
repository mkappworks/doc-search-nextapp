import {
  MutationCtx,
  QueryCtx,
  action,
  internalQuery,
  mutation,
  query,
} from "@convex/_generated/server";
import { ConvexError, v } from "convex/values";
import { api, internal } from "@convex/_generated/api";

import OpenAI from "openai";
import { Id } from "./_generated/dataModel";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function hasAccessToDocument(
  ctx: MutationCtx | QueryCtx,
  docId: Id<"docs">
) {
  const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
  if (!userId) return null;

  const doc = await ctx.db.get(docId);
  if (!doc) return null;
  if (doc.tokenIdentifier !== userId) return null;

  return { doc, userId };
}

export const hasAccessToDocumentQuery = internalQuery({
  args: {
    docId: v.id("docs"),
  },
  async handler(ctx, args) {
    return await hasAccessToDocument(ctx, args.docId);
  },
});

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
    const accessObject = await hasAccessToDocument(ctx, args.docId);
    if (!accessObject) return null;

    const { doc } = accessObject;

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

export const askQuestion = action({
  args: {
    question: v.string(),
    docId: v.id("docs"),
  },
  async handler(ctx, args) {
    const accessObject = await ctx.runQuery(
      internal.docs.hasAccessToDocumentQuery,
      {
        docId: args.docId,
      }
    );
    if (!accessObject)
      throw new ConvexError("You do not have access to this Doc");

    const { doc, userId } = accessObject;
    const file = await ctx.storage.get(doc.docId);
    if (!file) throw new ConvexError("File not found");

    const text = await file.text();

    const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
      await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Here is a text: ${text}`,
          },
          {
            role: "user",
            content: `Please answer this question: ${args.question}`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

    const aiResponse =
      chatCompletion.choices[0].message.content ??
      "could not generate response";

    await ctx.runMutation(internal.chats.createChatRecord, {
      docId: args.docId,
      text: args.question,
      tokenIdentifier: userId,
      isHuman: true,
    });

    await ctx.runMutation(internal.chats.createChatRecord, {
      docId: args.docId,
      text: aiResponse,
      tokenIdentifier: userId,
      isHuman: false,
    });

    return aiResponse;
  },
});
