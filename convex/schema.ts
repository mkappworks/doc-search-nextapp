import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  docs: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    tokenIdentifier: v.string(),
    storageId: v.id("_storage"),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
  chats: defineTable({
    docId: v.id("docs"),
    tokenIdentifier: v.string(),
    isHuman: v.boolean(),
    text: v.string(),
  }).index("by_docId_tokenIdentifier", ["docId", "tokenIdentifier"]),
  notes: defineTable({
    tokenIdentifier: v.string(),
    text: v.string(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
