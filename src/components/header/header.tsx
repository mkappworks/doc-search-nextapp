import { ModeToggle } from "@/components/ui/mode-toggle";
import { HeaderActions } from "@/components/header/header-actions";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <div className="relative z-10 bg-zinc-200 py-4 dark:bg-zinc-900">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <Image
              src="/logo.svg"
              width={40}
              height={40}
              className="rounded"
              alt="search doc icon"
            />
            DocSearch
          </Link>
          <nav>
            <Link href="/dashboard" className="hover:text-slate-300">
              Docs
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}
