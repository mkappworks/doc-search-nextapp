import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  memberships: defineTable({
    orgId: v.string(),
    userId: v.string(),
  }).index("by_orgId_userId", ["orgId", "userId"]),
  docs: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    membershipId: v.id("memberships"),
    storageId: v.id("_storage"),
    embedding: v.optional(v.array(v.float64())),
  })
    .index("by_membershipId", ["membershipId"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["membershipId"],
    }),
  chats: defineTable({
    docId: v.id("docs"),
    tokenIdentifier: v.string(),
    isHuman: v.boolean(),
    text: v.string(),
  }).index("by_docId_tokenIdentifier", ["docId", "tokenIdentifier"]),
  notes: defineTable({
    membershipId: v.id("memberships"),
    text: v.string(),
    embedding: v.optional(v.array(v.float64())),
  })
    .index("by_membershipId", ["membershipId"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["membershipId"],
    }),
});
