import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

async function Admins() {
  const session = await getServerSession(authOptions);

  if (session?.user)
    return (
      <h2 className="text-2xl">{session?.user.username}&lsquo;s Secret Page</h2>
    );
  return <h2 className="text-2xl">Please login to see this secret page</h2>;
}

export default Admins;
