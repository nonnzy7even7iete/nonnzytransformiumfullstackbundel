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

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  if (!mounted || status === "loading") return <Loader />;
  if (!session) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white relative">
      {/* Navbar en haut */}
      <Navbar />

      <div className="flex flex-1 relative">
        {/* Sidebar à gauche */}
        <Sidebar />

        {/* Contenu principal centré */}
        <main
          className="
            flex-1 flex flex-col items-center justify-start
            px-8 md:px-12 pt-[120px] pb-16
            overflow-y-auto gap-10
          "
        >
          <div className="flex flex-col items-center w-full max-w-7xl text-center">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-10">
              Bienvenue, {session.user?.name?.split(" ")[0] || "explorateur"} 👋
            </h1>

            {/* Grille des cartes */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full justify-items-center">
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
          </div>
        </main>
      </div>
    </div>
  );
}
