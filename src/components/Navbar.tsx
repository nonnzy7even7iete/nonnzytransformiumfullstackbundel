"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-16 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/50 backdrop-blur-md shadow-sm" : "bg-black"
      }`}
      style={{
        borderBottom: "1px solid",
        borderImage: "linear-gradient(to right, #ffffff2a, #f1f1f111) 1",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-end">
        {session && (
          <div className="text-gray-200 font-medium px-3 py-1 rounded-md">
            <UserMenu />
          </div>
        )}
      </div>
    </nav>
  );
}
