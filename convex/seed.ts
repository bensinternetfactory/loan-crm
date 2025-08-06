import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data (optional - comment out if you want to keep existing data)
    const existingAccounts = await ctx.db.query("accounts").collect();
    const existingContacts = await ctx.db.query("contacts").collect();
    const existingOpportunities = await ctx.db.query("opportunities").collect();
    const existingPreApprovals = await ctx.db.query("preApprovals").collect();
    
    // Delete existing data
    for (const account of existingAccounts) {
      await ctx.db.delete(account._id);
    }
    for (const contact of existingContacts) {
      await ctx.db.delete(contact._id);
    }
    for (const opportunity of existingOpportunities) {
      await ctx.db.delete(opportunity._id);
    }
    for (const preApproval of existingPreApprovals) {
      await ctx.db.delete(preApproval._id);
    }

    // Mock data
    const accountsData = [
      {
        name: "Acme Corporation",
        email: "contact@acme.com",
        phone: "555-0100",
      },
      {
        name: "TechStart Inc",
        email: "info@techstart.com",
        phone: "555-0200",
      },
      {
        name: "Global Ventures LLC",
        email: "hello@globalventures.com",
        phone: "555-0300",
      },
      {
        name: "Summit Industries",
        email: "contact@summit.com",
        phone: "555-0400",
      },
      {
        name: "Pioneer Solutions",
        email: "info@pioneer.com",
        phone: "555-0500",
      },
    ];

    const createdAccounts = [];
    
    // Create accounts
    for (const accountData of accountsData) {
      const accountId = await ctx.db.insert("accounts", {
        ...accountData,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      createdAccounts.push({ id: accountId, name: accountData.name });
    }

    // Create contacts for each account
    const contactsData = [
      { firstName: "John", lastName: "Smith", email: "john.smith@example.com", phone: "555-1001" },
      { firstName: "Sarah", lastName: "Johnson", email: "sarah.j@example.com", phone: "555-1002" },
      { firstName: "Michael", lastName: "Brown", email: "m.brown@example.com", phone: "555-1003" },
      { firstName: "Emily", lastName: "Davis", email: "emily.d@example.com", phone: "555-1004" },
      { firstName: "Robert", lastName: "Wilson", email: "r.wilson@example.com", phone: "555-1005" },
      { firstName: "Lisa", lastName: "Martinez", email: "lisa.m@example.com", phone: "555-1006" },
      { firstName: "David", lastName: "Anderson", email: "d.anderson@example.com", phone: "555-1007" },
      { firstName: "Jennifer", lastName: "Taylor", email: "j.taylor@example.com", phone: "555-1008" },
      { firstName: "James", lastName: "Thomas", email: "james.t@example.com", phone: "555-1009" },
      { firstName: "Maria", lastName: "Garcia", email: "m.garcia@example.com", phone: "555-1010" },
    ];

    let contactIndex = 0;
    for (const account of createdAccounts) {
      // Add 2 contacts per account
      for (let i = 0; i < 2; i++) {
        if (contactIndex < contactsData.length) {
          await ctx.db.insert("contacts", {
            accountId: account.id,
            ...contactsData[contactIndex],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });
          contactIndex++;
        }
      }
    }

    // Create opportunities for each account
    const opportunityStages = ["Prospecting", "Qualification", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];
    const opportunityNames = [
      "Equipment Financing",
      "Working Capital Loan",
      "Business Expansion",
      "Real Estate Purchase",
      "Inventory Financing",
      "Bridge Loan",
      "Term Loan",
      "Line of Credit",
    ];

    for (const account of createdAccounts) {
      // Add 1-3 opportunities per account
      const numOpportunities = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numOpportunities; i++) {
        await ctx.db.insert("opportunities", {
          accountId: account.id,
          name: opportunityNames[Math.floor(Math.random() * opportunityNames.length)],
          amount: Math.floor(Math.random() * 900000) + 100000, // $100k - $1M
          stage: opportunityStages[Math.floor(Math.random() * opportunityStages.length)],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }
    }

    // Create pre-approvals for some accounts
    const statuses = ["Active", "Expired", "Pending Review", "Approved"];
    for (let i = 0; i < 3; i++) {
      const account = createdAccounts[i];
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + Math.floor(Math.random() * 6) + 1);
      
      await ctx.db.insert("preApprovals", {
        accountId: account.id,
        amount: Math.floor(Math.random() * 400000) + 50000, // $50k - $450k
        status: statuses[Math.floor(Math.random() * statuses.length)],
        expiresAt: futureDate.toISOString(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    return {
      message: "Database seeded successfully!",
      stats: {
        accounts: createdAccounts.length,
        contacts: contactIndex,
        opportunities: "multiple per account",
        preApprovals: 3,
      },
    };
  },
});