"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Loader from "@/components/Loader";
import PotentialCard from "@/components/PotentialCard";

// Background animé
import WorldMap from "@/components/WorldMap";

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

  // Exemple de lignes sur la carte
  const dots = [
    {
      start: { lat: 48.8566, lng: 2.3522 },
      end: { lat: 40.7128, lng: -74.006 },
    }, // Paris → NYC
    {
      start: { lat: 35.6895, lng: 139.6917 },
      end: { lat: 51.5074, lng: -0.1278 },
    }, // Tokyo → London
  ];

  return (
    <div className="relative flex flex-col h-screen bg-black text-white font-sans">
      {/* Background WorldMap */}
      <WorldMap dots={dots} lineColor="#0ea5e9" />

      <Navbar />
      <div className="flex flex-1 relative z-10">
        <Sidebar />

        {/* Contenu central */}
        <main className="flex-1 pt-28 px-3 md:px-8 ml-0 md:ml-20 mb-16 md:mb-0 flex items-center justify-center">
          <PotentialCard
            title="Potentiel inexploité"
            description="Je souhaite obtenir un financement pour l’achat de matériel et développer l’intérêt de mon application."
            redirectPath="/dashboard/financement"
          />
        </main>
      </div>
    </div>
  );
}
