import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  accounts: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  contacts: defineTable({
    accountId: v.id("accounts"),
    firstName: v.string(),
    lastName: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_account", ["accountId"]),

  opportunities: defineTable({
    accountId: v.id("accounts"),
    name: v.string(),
    amount: v.number(),
    stage: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_account", ["accountId"]),

  preApprovals: defineTable({
    accountId: v.id("accounts"),
    amount: v.number(),
    status: v.string(),
    expiresAt: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_account", ["accountId"]),
});