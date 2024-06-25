"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

function SignOutButton() {
  return (
    <Button
      variant="destructive"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
    >
      Sign Out
    </Button>
  );
}

export default SignOutButton;
