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
      href: "/ResumeExecutif",
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
        className="fixed left-4 top-4 z-50 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition-colors"
      >
        <SlArrowDown className="w-6 h-6" />
      </button>

      {/* Navbar */}
      <div
        className={`fixed w-full z-40 transition-all duration-500 ${
          isVisible ? "translate-y-0" : "translate-y-full md:-translate-y-full"
        }`}
        style={{ bottom: 0, top: "auto" }}
      >
        <nav
          className={`w-full ${
            isScrolled
              ? "bg-black/30 backdrop-blur-lg border-t border-white/20 shadow-md"
              : "bg-black border-t border-white/10"
          } h-16`}
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-around md:justify-center">
            <div className="flex w-full md:flex-wrap justify-around gap-6 md:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex flex-col items-center text-white transition-transform duration-300 transform hover:-translate-y-1"
                >
                  {link.icon}
                  <span className="mt-1 md:mt-0 text-xs md:text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-400 hover:from-green-400 hover:to-blue-300 transition-all duration-300">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
