"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Dashboard() {
  const accounts = useQuery(api.accounts.list);
  const seedDatabase = useMutation(api.seed.seedDatabase);

  const handleSeed = async () => {
    try {
      const result = await seedDatabase();
      console.log("Seed result:", result);
      alert(result.message);
    } catch (error) {
      console.error("Error seeding database:", error);
      alert("Error seeding database");
    }
  };

  if (accounts === undefined) {
    return (
      <div className="p-8">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Loans CRM - Accounts</h1>
          <button
            onClick={handleSeed}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Seed Database with Mock Data
          </button>
        </div>

        {accounts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">No accounts found. Click the seed button to add mock data.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {accounts.map((account) => (
              <div key={account._id} className="bg-white border rounded-lg p-6 shadow-sm">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">{account.name}</h2>
                  <p className="text-gray-600">{account.email} • {account.phone}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Contacts */}
                  <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-medium mb-2">Contacts ({account.contacts.length})</h3>
                    <div className="space-y-1">
                      {account.contacts.map((contact) => (
                        <div key={contact._id} className="text-sm">
                          <p>{contact.firstName} {contact.lastName}</p>
                          <p className="text-gray-500">{contact.email}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Opportunities */}
                  <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-medium mb-2">Opportunities ({account.opportunities.length})</h3>
                    <div className="space-y-1">
                      {account.opportunities.map((opp) => (
                        <div key={opp._id} className="text-sm">
                          <p>{opp.name}</p>
                          <p className="text-gray-500">
                            ${(opp.amount / 1000).toFixed(0)}k • {opp.stage}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pre-Approvals */}
                  <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-medium mb-2">Pre-Approvals ({account.preApprovals.length})</h3>
                    <div className="space-y-1">
                      {account.preApprovals.map((preApproval) => (
                        <div key={preApproval._id} className="text-sm">
                          <p>${(preApproval.amount / 1000).toFixed(0)}k</p>
                          <p className="text-gray-500">{preApproval.status}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}