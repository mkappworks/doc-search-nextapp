import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  docs: defineTable({
    title: v.string(),
    tokenIdentifier: v.string(),
    docId: v.id("_storage"),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
