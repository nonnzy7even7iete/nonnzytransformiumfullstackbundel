"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Loader from "@/components/Loader";
import PotentialCard from "@/components/PotentialCard"; // notre composant créé

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") return <Loader />;
  if (!session) return null;

  return (
    <div className="flex flex-col h-screen bg-black/90 text-white font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 pt-28 px-3 overflow-auto ml-0 md:ml-20 mb-16 md:mb-0 flex items-center justify-center">
          {/* Carte “Potentiel inexploité” */}
          <PotentialCard
            title="Potentiel inexploité"
            description="Je souhaite obtenir un financement pour l’achat de matériel et développer l’intérêt de mon application."
            redirectPath="/dashboard/financement" // page détaillée
          />
        </main>
      </div>
    </div>
  );
}
