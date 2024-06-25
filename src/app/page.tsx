import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <h1 className="text-4xl">Home</h1>
      <Link className={buttonVariants()} href="/admin">
        Open My Admin
      </Link>
    </main>
  );
}
