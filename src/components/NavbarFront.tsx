"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { TextHoverEffect } from "./ui/TextHoverEffect";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export default function NavbarFront() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showBorder, setShowBorder] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        /* Effet de fumée animé au hover */
        .smoke-hover {
          position: relative;
          overflow: hidden;
          transition: all 0.5s ease;
        }
        .smoke-hover:hover {
          background: radial-gradient(circle at center, 
            rgba(255, 0, 0, 0.15) 0%, 
            rgba(40, 40, 40, 0.1) 40%, 
            rgba(120, 120, 120, 0.05) 70%, 
            transparent 100%
          );
          backdrop-filter: blur(12px);
          box-shadow: 0 0 20px rgba(0,0,0,0.2);
        }
        
        /* Burger Menu 2 barres (Vercel style) */
        .burger-line {
          height: 1.5px;
          background-color: var(--foreground);
          transition: all 0.3s ease;
        }

        .gradient-border {
          background-image: radial-gradient(circle at center, #22c55e 0%, #f97316 40%, #000000 75%, #000000 100%);
          background-size: 80% 100%;
          height: 1px; width: 100%;
        }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 h-16 ${
          isScrolled
            ? "bg-glass-dual backdrop-blur-xl border-b border-border-dual"
            : "bg-transparent"
        } has-[.menubar-root:hover]:scale-[1.01]`}
      >
        <div className="flex h-full items-center justify-between px-6 relative">
          {/* GAUCHE : LOGO */}
          <div className="z-[60]">
            <Link href="/" className="block h-10 w-28 relative">
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* CENTRE : NAVIGATION */}
          <div className="absolute left-1/2 -translate-x-1/2 z-[80] hidden md:block">
            <Menubar className="menubar-root bg-glass-dual border border-border-dual rounded-[var(--radius)] p-1 gap-1.5 shadow-2xl">
              {["ResumeExecutif", "logique-metier-serveur", "zymantra"].map(
                (path) => (
                  <MenubarMenu key={path}>
                    <Link href={`/${path}`}>
                      <MenubarTrigger className="smoke-hover cursor-pointer border border-border-dual rounded-[calc(var(--radius)-4px)] px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all">
                        {path.replace(/-/g, " ")}
                      </MenubarTrigger>
                    </Link>
                  </MenubarMenu>
                )
              )}
            </Menubar>
          </div>

          {/* DROITE : THEME & BURGER 2 LIGNES */}
          <div className="flex items-center gap-4 z-[60]">
            <ThemeToggle />

            <Sheet>
              <SheetTrigger className="group flex flex-col gap-[6px] p-2 focus:outline-none">
                <div className="burger-line w-6 group-hover:w-4" />
                <div className="burger-line w-4 group-hover:w-6" />
              </SheetTrigger>

              <SheetContent className="bg-glass-dual border-l border-border-dual backdrop-blur-3xl text-foreground">
                <SheetTitle className="text-foreground border-b border-border-dual pb-4 mb-6 uppercase tracking-tighter">
                  Navigation
                </SheetTitle>
                <div className="flex flex-col gap-4">
                  {[
                    "ResumeExecutif",
                    "logique-metier-serveur",
                    "zymantra",
                    "dashboard",
                  ].map((item) => (
                    <Link
                      key={item}
                      href={`/${item}`}
                      className="smoke-hover p-4 rounded-xl border border-border-dual text-sm font-bold uppercase tracking-widest transition-all"
                    >
                      {item.replace(/-/g, " ")}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
