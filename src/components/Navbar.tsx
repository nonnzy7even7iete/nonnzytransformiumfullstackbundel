"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-black/50 backdrop-blur-md shadow-sm"
          : "bg-black"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-white tracking-wide">
          <Link href="/">
            Nonnzy<span className="text-green-600">transformium</span>
          </Link>
        </div>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center gap-6">
          {session ? (
            <UserMenu />
          ) : (
            <>
              <Link
                href="/register"
                className="text-white/80 hover:text-green-400 transition-colors"
              >
                Inscription
              </Link>
              <Link
                href="/login"
                className="text-white/80 hover:text-green-400 transition-colors"
              >
                Connexion
              </Link>
            </>
          )}
        </div>

        {/* Burger menu (mobile) */}
        <button className="md:hidden text-white">
          <Menu size={28} />
        </button>
      </div>
    </nav>
  );
}
