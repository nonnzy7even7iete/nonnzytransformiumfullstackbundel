"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { TextHoverEffect } from "../ui/TextHoverEffect";
import { AnimatedThemeToggler } from "@/components/frontendkit/AnimatedThemeToggler";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import MobileMenu from "@/components/frontendkit/MobileMenu";

export default function NavbarFront() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: "/ResumeExecutif", label: "Résumé Exécutif" },
    { href: "/logique-metier-serveur", label: "Logique Métier & Serveur" },
    { href: "/zymantra", label: "Zymantra" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 h-20 flex items-center ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex w-full h-full items-center px-6 lg:px-10 relative">
          {/* LOGO SECTION */}
          <div className="flex items-center w-40 lg:w-56 h-full z-[60]">
            <Link href="/" className="block w-full h-full flex items-center">
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* MENU CENTRAL - Zinc 700 & Gutter Padding */}
          <div className="flex-1 hidden md:flex justify-center items-center z-[80]">
            <Menubar className="h-11 bg-accents-1/20 border border-zinc-300 dark:border-zinc-700 rounded-[7px] p-1.5 gap-2 backdrop-blur-xl">
              {navLinks.map((link) => (
                <MenubarMenu key={link.href}>
                  <Link href={link.href} className="no-underline">
                    <MenubarTrigger
                      className="cursor-pointer px-4 h-full text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50 transition-all duration-300 rounded-[7px] border border-zinc-300 dark:border-zinc-700 bg-transparent
                        /* HOVER LOGIC : Magie Verte & Transparence */
                        hover:text-emerald-600 dark:hover:text-emerald-400
                        hover:bg-emerald-500/10 dark:hover:bg-emerald-500/5
                        hover:border-emerald-500/30
                        focus:bg-transparent"
                    >
                      {link.label}
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>

          {/* ACTIONS DROITE */}
          <div className="w-40 lg:w-56 flex justify-end items-center gap-4 lg:gap-6 z-[60]">
            <div className="border-none bg-transparent outline-none ring-0">
              <AnimatedThemeToggler />
            </div>
            <div className="md:hidden text-foreground">
              <MobileMenu links={navLinks} session={session} />
            </div>
          </div>
        </div>

        {/* SCANNER LINE - La couche magique orange/verte */}
        <div className="absolute bottom-0 h-[2.5px] w-full magic-scanner" />
      </nav>

      {/* PIED DE PAGE : STYLES & ANIMATIONS */}
      <style jsx global>{`
        @keyframes awwwards-scanner-flow {
          /* 0s à 7s : APPARITION (33.3% de 21s) */
          0% {
            opacity: 0;
            transform: scaleX(0);
            background-position: 0% 50%;
          }
          5% {
            opacity: 1;
            transform: scaleX(1);
          }
          30% {
            opacity: 1;
            transform: scaleX(1);
            background-position: 100% 50%;
          }
          33.33% {
            opacity: 0;
            transform: scaleX(0);
          }
          /* 7s à 21s : INVISIBILITÉ (66.6% de 21s) */
          100% {
            opacity: 0;
            transform: scaleX(0);
          }
        }

        .magic-scanner {
          animation: awwwards-scanner-flow 21s cubic-bezier(0.4, 0, 0.2, 1)
            infinite;
          background-size: 200% 100%;
          /* Gradient Orange/Vert entre deux extrémités Noires Absolues */
          background-image: linear-gradient(
            to right,
            #000000 0%,
            #f97316 35%,
            #10b981 65%,
            #000000 100%
          );
        }

        /* Support Dark Mode pour le gradient si nécessaire */
        .dark .magic-scanner {
          background-image: linear-gradient(
            to right,
            #000000 0%,
            #ea580c 35%,
            #059669 65%,
            #000000 100%
          );
        }
      `}</style>
    </>
  );
}
