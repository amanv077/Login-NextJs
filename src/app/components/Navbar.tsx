import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignOutButton from "./SignOutButton";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className=" py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <h1 className=" text-4xl font-semibold text-sky-700  hover:text-cyan-950 select-none">
          ITax <span className="text-xl font-semibold">Easy</span>
        </h1>
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
