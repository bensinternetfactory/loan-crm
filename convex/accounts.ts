import { query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const accounts = await ctx.db.query("accounts").collect();
    
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