"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
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
            ? "bg-black/95 backdrop-blur-[32px] border-b border-zinc-800/30"
            : "bg-black backdrop-blur-[12px] border-b border-transparent"
        }`}
      >
        <div className="flex w-full h-full items-center px-6 lg:px-10 relative">
          {/* LOGO */}
          <div className="flex items-center w-40 lg:w-56 h-full z-[60]">
            <Link href="/" className="block w-full h-full flex items-center">
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* MENU CENTRAL */}
          <div className="flex-1 hidden md:flex justify-center items-center z-[80]">
            <Menubar className="h-11 bg-zinc-950/50 border border-zinc-700 rounded-[7px] p-1.5 gap-2 backdrop-blur-md">
              {navLinks.map((link) => (
                <MenubarMenu key={link.href}>
                  <Link href={link.href} className="no-underline">
                    <MenubarTrigger
                      className="cursor-pointer px-4 h-full text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 transition-all duration-300 rounded-[7px] border border-zinc-700/50 bg-transparent
                        hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30
                        focus:bg-transparent"
                    >
                      {link.label}
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>

          {/* ACTIONS */}
          <div className="w-40 lg:w-56 flex justify-end items-center gap-4 lg:gap-8 z-[60]">
            <AnimatedThemeToggler />
            <div className="md:hidden">
              <MobileMenu
                links={navLinks}
                session={session}
                triggerIcon={
                  <HiOutlineMenuAlt4 className="w-8 h-8 text-zinc-500 hover:text-emerald-400 transition-colors cursor-pointer" />
                }
              />
            </div>
          </div>
        </div>

        {/* --- LA STRUCTURE DE BORDURE "AWWWARDS" EN 3 COUCHES --- */}
        <div className="absolute bottom-0 w-full h-[2px] overflow-hidden flex">
          {/* COUCHE 1 : EXTRÉMITÉ GAUCHE (NOIR PUR) */}
          <div className="w-[15%] h-full bg-black z-30" />
          <div className="w-[10%] h-full bg-gradient-to-r from-black to-transparent z-20" />

          {/* COUCHE 2 : LE FLUX CENTRAL (L'INTERACTION) */}
          <div className="flex-1 h-full relative z-10">
            <div className="absolute inset-0 magic-interaction-flow" />
          </div>

          {/* COUCHE 3 : EXTRÉMITÉ DROITE (NOIR PUR) */}
          <div className="w-[10%] h-full bg-gradient-to-l from-black to-transparent z-20" />
          <div className="w-[15%] h-full bg-black z-30" />
        </div>
      </nav>

      <style jsx global>{`
        @keyframes google-magic-flow {
          0% {
            opacity: 0;
            transform: scaleX(0.7);
            filter: blur(10px);
            background-position: 0% 50%;
          }
          10% {
            opacity: 1;
            transform: scaleX(1);
            filter: blur(2px);
          }
          25% {
            background-position: 100% 50%;
          }
          33.33% {
            opacity: 0;
            transform: scaleX(1.1);
            filter: blur(15px);
          }
          100% {
            opacity: 0;
          }
        }

        .magic-interaction-flow {
          animation: google-magic-flow 21s ease-in-out infinite;
          background: linear-gradient(
            90deg,
            #000000,
            #f97316,
            /* Orange Google */ #10b981,
            /* Vert Logic */ #3b82f6,
            /* Bleu Magic */ #000000
          );
          background-size: 300% 100%;
        }

        .bg-black {
          background-color: #000000 !important;
        }
      `}</style>
    </>
  );
}
