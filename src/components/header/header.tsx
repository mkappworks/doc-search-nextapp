import { ModeToggle } from "@/components/ui/mode-toggle";
import { HeaderActions } from "@/components/header/header-actions";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <div className="z-10 relative dark:bg-slate-900 bg-slate-50 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-8 items-center">
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
        </div>

        <div className="flex gap-4 items-center">
          <ModeToggle />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}
