"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function UserSync() {
  const { user, isLoaded } = useUser();
  const createOrUpdateUser = useMutation(api.users.createOrUpdateUser);

  useEffect(() => {
    if (isLoaded && user) {
      const syncUser = async () => {
        try {
          await createOrUpdateUser({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress || "",
            firstName: user.firstName || undefined,
            lastName: user.lastName || undefined,
            imageUrl: user.imageUrl || undefined,
          });
        } catch (error) {
          console.error("Error syncing user:", error);
        }
      };

      syncUser();
    }
  }, [isLoaded, user, createOrUpdateUser]);

  return null;
}