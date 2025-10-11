"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PotentialCard from "@/components/PotentialCard";
import Loader from "@/components/Loader";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  if (!mounted || status === "loading") return <Loader />;
  if (!session) return null;

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-950 text-white px-6 md:px-12 pt-28 pb-16">
      {/* Message d’accueil bien visible */}
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-10 text-center">
        Bienvenue, {session.user?.name?.split(" ")[0] || "explorateur"} 👋
      </h1>

      {/* Grille des cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-7xl">
        <PotentialCard
          title="Découvre ton potentiel"
          description="Explore les mécanismes du futur et révèle la puissance de ton esprit créatif."
          redirectPath="/exploration"
        />
      </div>
    </main>
  );
}
