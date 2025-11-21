"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Home, FileText, LayoutDashboard } from "lucide-react";
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
      href: "/",
      label: "Accueil",
      icon: <Home className="w-5 h-5 md:w-6 md:h-6" />,
    },
    {
      href: "/resume-executif",
      label: "Résumé",
      icon: <FileText className="w-5 h-5 md:w-6 md:h-6" />,
    },
  ];

  if (session) {
    navLinks.push({
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5 md:w-6 md:h-6" />,
    });
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`fixed left-2 top-2 z-50 p-1 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-green-600 transition-colors`}
      >
        <SlArrowDown
          className={`w-4 h-4 transition-transform duration-500 ${
            isVisible ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>

      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-40 transition-transform duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-20 md:-translate-y-20"
        } ${
          isScrolled
            ? "bg-black/30 backdrop-blur-lg border-b border-white/20 shadow-md"
            : "bg-black border-b border-white/10"
        } h-16`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-around md:justify-center">
          <div className="flex w-full md:flex-wrap justify-around gap-6 md:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center text-white transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                {link.icon}
                <span className="mt-1 md:mt-0 text-xs md:text-sm font-semibold text-white hover:text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-500 transition-all duration-500 animate-pulse">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
