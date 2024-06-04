import { v } from "convex/values";

import { internalMutation, QueryCtx } from "./_generated/server";

export const addUserIdToOrg = internalMutation({
  args: {
    orgId: v.string(),
    userId: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("memberships", {
      orgId: args.orgId,
      userId: args.userId,
    });
  },
});

export const removeUserIdFromOrg = internalMutation({
  args: {
    orgId: v.string(),
    userId: v.string(),
  },
  async handler(ctx, args) {
    const membership = await ctx.db
      .query("memberships")
      .withIndex("by_orgId_userId", (q) =>
        q.eq("orgId", args.orgId).eq("userId", args.userId),
      )
      .first();

    if (membership) {
      await ctx.db.delete(membership._id);
    }
  },
});

export async function hasMembership(
  ctx: QueryCtx,
  userId: string,
  organizationId?: string,
) {
  const orgId = organizationId ?? "personal";

  return await ctx.db
    .query("memberships")
    .withIndex("by_orgId_userId", (q) =>
      q.eq("orgId", orgId).eq("userId", userId),
    )
    .first();
}
