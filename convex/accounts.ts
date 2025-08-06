import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      return [];
    }

    const accounts = await ctx.db
      .query("accounts")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
    
    // For each account, get related data
    const accountsWithRelations = await Promise.all(
      accounts.map(async (account) => {
        const contacts = await ctx.db
          .query("contacts")
          .withIndex("by_account", (q) => q.eq("accountId", account._id))
          .collect();
        
        const opportunities = await ctx.db
          .query("opportunities")
          .withIndex("by_account", (q) => q.eq("accountId", account._id))
          .collect();
        
        const preApprovals = await ctx.db
          .query("preApprovals")
          .withIndex("by_account", (q) => q.eq("accountId", account._id))
          .collect();
        
        return {
          ...account,
          contacts,
          opportunities,
          preApprovals,
        };
      })
    );
    
    return accountsWithRelations;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const now = Date.now();
    const accountId = await ctx.db.insert("accounts", {
      userId: user._id,
      name: args.name,
      email: args.email,
      phone: args.phone,
      createdAt: now,
      updatedAt: now,
    });

    return accountId;
  },
});