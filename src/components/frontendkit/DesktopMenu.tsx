"use client";

import Link from "next/link";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

interface NavLink {
  href: string;
  label: string;
}

export function DesktopMenu({ links }: { links: NavLink[] }) {
  return (
    <div className="flex-1 hidden md:flex justify-center items-center z-[110]">
      <Menubar className="h-11 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[var(--radius-vercel)] p-1 gap-1.5">
        {links.map((link) => (
          <MenubarMenu key={link.href}>
            <Link href={link.href} className="no-underline">
              <MenubarTrigger className="cursor-pointer px-4 h-full text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)]/60 border border-[var(--border-color)] bg-[var(--card-bg)] rounded-[var(--radius-vercel)] transition-all hover:text-emerald-500 hover:border-emerald-500/40">
                {link.label}
              </MenubarTrigger>
            </Link>
          </MenubarMenu>
        ))}
      </Menubar>
    </div>
  );
}
