"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FileText, LayoutDashboard } from "lucide-react";
import { SlArrowDown } from "react-icons/sl";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      href: "/resume-executif",
      label: "Résumé",
      icon: <FileText className="w-4 h-4 md:w-5 md:h-5" />,
    },
  ];

  if (session) {
    navLinks.push({
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5" />,
    });
  }

  return (
    <>
      {/* Toggle bouton mini (à droite) */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed right-3 top-3 z-50 text-white hover:text-green-400 transition-transform duration-300"
      >
        <SlArrowDown
          className={`w-3 h-3 transition-transform duration-500 ${
            isVisible ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>

      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-40 transition-transform duration-500
        ${isVisible ? "translate-y-0" : "-translate-y-20"}
        ${
          isScrolled
            ? "bg-black/20 backdrop-blur-sm border-b border-white/10"
            : "bg-black/40 backdrop-blur-lg border-b border-white/20"
        }
        h-16 shadow-md`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Branding "Nonntre" cliquable */}
          <Link
            href="/"
            className="text-transparent bg-clip-text 
              bg-gradient-to-r from-green-500 via-green-300 to-blue-700
              font-semibold text-lg tracking-wide transition-all duration-300 hover:brightness-110"
          >
            Nonntre
          </Link>

          {/* Liens centrés */}
          <div className="flex gap-8 md:gap-10 mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center relative text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                {link.icon}
                <span className="mt-1 text-xs md:text-sm font-light">
                  {link.label}
                </span>

                {/* Hover premium glass */}
                <span
                  className="absolute inset-0 rounded-xl opacity-0 
                  hover:opacity-100 transition-all duration-300 
                  bg-green-400/20 backdrop-blur-md p-4 -z-10"
                />
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
