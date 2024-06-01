"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export function HeaderActions() {
  return (
    <>
      <Unauthenticated>
        <Button>
          <SignInButton />
        </Button>
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
      <AuthLoading>
        <Loader2 className="animate-spin" />
      </AuthLoading>
    </>
  );
}
