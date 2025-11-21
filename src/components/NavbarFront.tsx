"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Home, FileText, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Accueil", icon: <Home className="w-6 h-6" /> },
    {
      href: "/resume-executif",
      label: "Résumé",
      icon: <FileText className="w-6 h-6" />,
    },
  ];

  if (session) {
    navLinks.push({
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-6 h-6" />,
    });
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500
        ${
          isScrolled
            ? "bg-black/30 backdrop-blur-lg border-t border-white/20 shadow-md"
            : "bg-black border-t border-white/10"
        }
        bottom-0 md:top-0`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-around md:justify-center">
        <div className="flex w-full md:flex-wrap justify-around gap-4 md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center text-white hover:text-cyan-400 transition-transform duration-300 transform hover:-translate-y-1 md:flex-row md:gap-2"
            >
              {link.icon}
              <span className="text-xs mt-1 md:mt-0 md:text-sm">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
