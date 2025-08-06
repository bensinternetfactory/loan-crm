import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  accounts: defineTable({
    userId: v.optional(v.id("users")),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"]),

  contacts: defineTable({
    userId: v.optional(v.id("users")),
    accountId: v.id("accounts"),
    firstName: v.string(),
    lastName: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_account", ["accountId"])
    .index("by_user", ["userId"]),

  opportunities: defineTable({
    userId: v.optional(v.id("users")),
    accountId: v.id("accounts"),
    name: v.string(),
    amount: v.number(),
    stage: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_account", ["accountId"])
    .index("by_user", ["userId"]),

  preApprovals: defineTable({
    userId: v.optional(v.id("users")),
    accountId: v.id("accounts"),
    amount: v.number(),
    status: v.string(),
    expiresAt: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_account", ["accountId"])
    .index("by_user", ["userId"]),
});