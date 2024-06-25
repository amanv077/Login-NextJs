import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { AnnoyedIcon } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignOutButton from "./SignOutButton";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className=" py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <AnnoyedIcon />
        </Link>
        {session?.user ? (
          <SignOutButton />
        ) : (
          <Link className={buttonVariants()} href="/sign-in">
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
