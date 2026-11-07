import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import CartLink from "./CartLink";
import AuthLinks from "./AuthLink";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <Link href="/" className="text-xl font-bold">
        Swiftie
      </Link>

      <div className="flex items-center gap-3">
        <AuthLinks/>
        <CartLink/>
      <ThemeToggle />
      </div>
      
      
    </nav>
  );
}