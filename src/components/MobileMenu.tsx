"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { TextHoverEffect } from "./ui/TextHoverEffect";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { MobileMenu } from "./MobileMenu";

export default function NavbarFront() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBorder, setShowBorder] = useState(false);
  const { data: session } = useSession();

  // Logique de disparition de la navbar au scroll (Real-time)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Navbar floue si on a scrollé un peu
      setIsScrolled(currentScrollY > 10);

      // Cache la navbar si on descend, la montre si on remonte
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Cycle de la bordure animée
  useEffect(() => {
    const cycle = () => {
      setShowBorder(false);
      setTimeout(() => {
        setShowBorder(true);
        setTimeout(() => setShowBorder(false), 5000);
      }, 7000);
    };
    cycle();
    const interval = setInterval(cycle, 12000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { href: "/ResumeExecutif", label: "Résumé Exécutif" },
    { href: "/logique-metier-serveur", label: "Logique Métier & Serveur" },
    { href: "/zymantra", label: "Zymantra" },
  ];

  return (
    <>
      <style>{`
        /* LOGIQUE BORDER EN SURBRILLANCE & FUMÉE */
        .smoke-hover {
          position: relative;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          border: 1px solid var(--color-border-dual) !important;
        }

        .smoke-hover:hover {
          /* Surbrillance forcée */
          border-color: rgba(255, 255, 255, 0.5) !important;
          background: radial-gradient(circle at center, 
            rgba(0, 0, 0, 0.6) 0%, 
            rgba(20, 20, 20, 0.4) 45%, 
            rgba(40, 40, 40, 0.1) 80%, 
            transparent 100%
          ) !important;
          backdrop-filter: blur(15px) saturate(160%);
          transform: translateY(-1.5px);
          box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.5);
        }

        .gradient-border {
          background-image: radial-gradient(circle at center, #22c55e 0%, #f97316 40%, #000000 75%, #000000 100%);
          background-repeat: no-repeat;
          background-position: center;
          background-size: 80% 100%;
          height: 1px; width: 100%;
          transition: opacity 1000ms ease-in-out;
        }

        *:focus { outline: none !important; ring: 0 !important; }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 h-16 flex items-center ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-glass-dual backdrop-blur-xl border-b border-border-dual"
            : "bg-transparent"
        }
        has-[.menubar-root:hover]:scale-[1.01]`}
      >
        <div className="flex w-full h-full items-center px-6 relative">
          {/* GAUCHE : LOGO */}
          <div className="flex items-center w-48 h-full z-[60]">
            <Link
              href="/"
              className="block w-full h-full relative flex items-center overflow-visible"
            >
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* CENTRE : DESKTOP MENU */}
          <div className="flex-1 hidden md:flex justify-center items-center z-[80]">
            <Menubar className="menubar-root h-auto bg-glass-dual border border-border-dual rounded-[var(--radius)] p-1 gap-2 shadow-2xl">
              {navLinks.map((link) => (
                <MenubarMenu key={link.href}>
                  <Link href={link.href} className="no-underline">
                    <MenubarTrigger className="smoke-hover cursor-pointer rounded-[calc(var(--radius)-4px)] px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all">
                      {link.label}
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              ))}
              {session && (
                <MenubarMenu>
                  <Link href="/dashboard" className="no-underline">
                    <MenubarTrigger className="smoke-hover cursor-pointer rounded-[calc(var(--radius)-4px)] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-green-500/80 hover:text-green-400">
                      Dashboard
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              )}
            </Menubar>
          </div>

          {/* DROITE : TOOLS & BURGER (Visible uniquement Mobile/Tablette) */}
          <div className="w-48 flex justify-end items-center gap-4 z-[60]">
            <ThemeToggle />

            <div className="md:hidden">
              <MobileMenu links={navLinks} session={session} />
            </div>
          </div>
        </div>

        {/* BORDURE ANIMÉE */}
        <div
          className={`absolute bottom-0 gradient-border ${
            showBorder ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>
    </>
  );
}
