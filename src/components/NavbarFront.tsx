"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Home, FileText, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Définition des liens avec icônes et label
  const navLinks = [
    { href: "/", label: "Accueil", icon: <Home className="w-5 h-5" /> },
    {
      href: "/resume-executif",
      label: "Résumé",
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  if (session) {
    navLinks.push({
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    });
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500
        ${
          isScrolled
            ? "bg-black/30 backdrop-blur-lg border-b border-white/20 shadow-md"
            : "bg-black border-b border-white/10"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-white font-bold text-xl">Nonnzytr</span>
        </Link>

        {/* Liens */}
        <div className="flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center md:flex-row md:gap-2 text-white hover:text-red-500 transition-colors duration-300"
            >
              {link.icon}
              <span className="text-xs md:text-sm">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
