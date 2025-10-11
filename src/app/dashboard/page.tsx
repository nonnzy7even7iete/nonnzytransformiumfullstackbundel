"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PotentialCard from "@/components/PotentialCard";
import Loader from "@/components/Loader";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Évite le rendu avant que le client soit monté
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirection si utilisateur non authentifié
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Affiche le Loader pendant la vérification ou le montage
  if (!mounted || status === "loading") {
    return <Loader />;
  }

  // Si pas de session, rien à afficher (redirigé)
  if (!session) return null;

  // Dashboard complet si session valide
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      {/* Navbar */}
      <Navbar user={session.user} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Contenu principal */}
        <main className="flex-1 p-8 flex flex-col items-center justify-start gap-10 overflow-y-auto">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
            Bienvenue, {session.user?.name?.split(" ")[0] || "explorateur"} 👋
          </h1>

          {/* Les cartes */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-7xl">
            <PotentialCard
              title="Découvre ton potentiel"
              description="Explore les mécanismes du futur et révèle la puissance de ton esprit créatif."
              redirectPath="/exploration"
            />
            <PotentialCard
              title="Transforme ton savoir"
              description="Deviens architecte de ton avenir grâce à la maîtrise des outils numériques."
              redirectPath="/formation"
            />
            <PotentialCard
              title="Inspire et innove"
              description="Pense différemment, imagine des solutions et propulse ton univers vers demain."
              redirectPath="/innovation"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
