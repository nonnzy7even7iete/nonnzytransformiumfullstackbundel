"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

interface MobileMenuProps {
  links: { href: string; label: string }[];
  session: any;
}

export function MobileMenu({ links, session }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger className="group flex flex-col gap-[6px] p-2 bg-transparent border-none outline-none focus:ring-0">
        <div className="burger-line w-6 group-hover:w-4" />
        <div className="burger-line w-4 group-hover:w-6" />
      </SheetTrigger>

      <SheetContent className="bg-glass-dual border-l border-border-dual backdrop-blur-3xl p-6">
        <SheetTitle className="text-foreground border-b border-border-dual pb-4 mb-6 uppercase tracking-widest text-[10px] font-bold">
          Menu Principal
        </SheetTitle>
        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="smoke-hover p-4 rounded-xl border border-border-dual text-[10px] font-bold uppercase tracking-widest block"
            >
              {link.label}
            </Link>
          ))}
          {session && (
            <Link
              href="/dashboard"
              className="p-4 rounded-xl border border-border-dual text-green-500 text-[10px] font-bold uppercase tracking-widest"
            >
              Dashboard
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
