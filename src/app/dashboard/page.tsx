"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Loader from "@/components/Loader";
import PotentialCard from "@/components/PotentialCard";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirection si non connecté
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") return <Loader />;
  if (!session) return null;

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans relative overflow-hidden">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        {/* Contenu central */}
        <main
          className="
            flex-1 pt-28 px-3 md:px-8 
            ml-0 md:ml-20 mb-16 md:mb-0
            flex items-center justify-center
            relative
          "
        >
          {/* Fond décoratif subtil */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-blue-800/10 pointer-events-none blur-3xl" />

          {/* Carte principale */}
          <div className="relative z-10">
            <PotentialCard
              title="Potentiel inexploité"
              description="Je souhaite obtenir un financement pour l’achat de matériel et développer l’intérêt de mon application."
              redirectPath="/dashboard/financement"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
