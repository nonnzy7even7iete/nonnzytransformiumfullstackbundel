"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Loader from "@/components/Loader"; // ✅ import du composant Loader

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // ---- Loader custom pendant le chargement ----
  if (status === "loading") return <Loader />;

  // ---- Redirection si pas de session ----
  if (!session) return null;

  return (
    <div className="flex flex-col h-screen bg-black/90 text-white font-sans">
      {/* Navbar en haut */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar responsive importée */}
        <Sidebar />

        {/* Contenu principal */}
        <main className="flex-1 p-8 overflow-auto ml-0 md:ml-20 mb-16 md:mb-0">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-green-400/80">
              Awards Côte d’Ivoire 2026
            </h1>
            <p className="text-gray-300/80 mt-2">
              Bienvenue, {session.user?.name}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-green-400/20 hover:scale-105 transition-all cursor-pointer shadow-none"
              >
                <h2 className="text-lg font-semibold mb-1 text-white/90">
                  Award #{i}
                </h2>
                <p className="text-gray-300/70 text-sm">
                  Description de l’award Côte d’Ivoire 2026
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
