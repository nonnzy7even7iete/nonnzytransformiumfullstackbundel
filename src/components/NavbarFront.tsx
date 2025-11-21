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
      className={`fixed top-0 w-full z-50 transition-all duration-500
        ${
          isScrolled
            ? "bg-black/30 backdrop-blur-lg border-b border-white/20 shadow-md"
            : "bg-black border-b border-white/10"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center">
        <div className="flex flex-wrap justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center md:flex-row md:gap-2 text-white hover:text-red-500 transition-colors duration-300"
            >
              {link.icon}
              <span className="text-xs md:text-sm mt-1 md:mt-0">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
