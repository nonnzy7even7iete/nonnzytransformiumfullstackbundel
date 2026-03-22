"use client";

import React, { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Info, Home, Github, Linkedin } from "lucide-react";

// Imports synchronisés
import Loader from "@/components/frontendkit/ui/Loader";
import { MasterAuroraBackground } from "@/components/frontendkit/ui/MasterAuroraBackground";
import SideCard from "@/components/frontendkit/ui/SideCard";
import DataCard from "@/components/frontendkit/ui/DataCard";
import Navbar from "@/components/frontendkit/ui/NavbarFront";
import LoginCard from "@/components/frontendkit/ui/LoginCard";
import { Dock, type DockItem } from "@/components/frontendkit/ui/dock";
import { cn } from "@/lib/utils";

/**
 * IMPORTATION DE TON NOUVEAU COMPOSANT D'INGÉNIERIE
 * Notation par point : on importe la fonction exportée DataTexteIngeneering.
 */
import { DataTexteIngeneering } from "@/components/frontendkit/ui/dataTexteIngeneering";

export default function HomePage() {
  const { status } = useSession();
  const router = useRouter();

  // useMemo : Mémorise la configuration du Dock pour éviter des re-rendus inutiles.
  const dockItems: DockItem[] = useMemo(
    () => [
      { icon: Home, href: "/", label: "H" },
      { icon: Github, href: "https://github.com", label: "G" },
      { icon: Linkedin, href: "https://linkedin.com", label: "L" },
    ],
    []
  );

  // useEffect : Logique de redirection automatique si l'utilisateur est déjà loggé.
  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  // Gestion de l'état de chargement
  if (status === "loading" || status === "authenticated") return <Loader />;

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--background)] overflow-x-hidden">
      <Navbar />

      {/* BACKGROUND LAYER : MasterAuroraBackground reste en fond fixe */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MasterAuroraBackground />
      </div>

      {/* MAIN LAYOUT : STRUCTURE INITIALE PRÉSERVÉE (DataCard, LoginCard, SideCard) */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center lg:justify-center px-4 lg:px-2 gap-6 pt-32 pb-44 w-full max-w-[1280px] mx-auto">
        {/* BLOC GAUCHE - DATA CARD */}
        <div className="order-2 lg:order-1 w-full max-w-[360px] h-[450px] shrink-0">
          <DataCard
            height={450}
            className="!w-full !max-w-none !min-w-0 h-full"
            title={
              <div className="flex items-center gap-2 text-[var(--foreground)]">
                <Info className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-bold text-[13px] leading-tight uppercase tracking-tighter">
                  Data-driven growth : potentiel d'Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col h-[350px] text-left text-[var(--foreground)]">
                <div className="flex-grow overflow-y-auto pr-2 scrollbar-hide space-y-4 text-[14px] leading-relaxed">
                  <p>
                    Les métriques d'attractivité et les flux d'investissement
                    convergent vers une réalité : le vrai potentiel se mesure
                    dans ce qui reste à révéler. Anyama dispose d'un avantage
                    stratégique encore invisible à la majorité des acteurs.
                  </p>
                  <p>
                    La data ne ment pas — la question, c'est qui l'exploitera en
                    premier :{" "}
                    <span className="text-emerald-500 font-bold">
                      Vision partagée
                    </span>
                  </p>
                  <p className="italic opacity-80">
                    Votre commune entre dans une zone d'attractivité stratégique
                    :{" "}
                    <span className="text-emerald-500 font-bold not-italic">
                      Sans insights, chaque décision est un pari perdu d'avance.
                    </span>
                  </p>
                </div>
                <div className="mt-auto pt-4 border-t border-[var(--border-color)]">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                    Système d'analyse temps réel
                  </span>
                </div>
              </div>
            }
          />
        </div>

        {/* BLOC CENTRAL - LOGIN CARD */}
        <div className="order-1 lg:order-2 w-full max-w-[440px] h-[450px] shrink-0">
          <LoginCard className="!w-full !max-w-none !min-w-0 h-full" />
        </div>

        {/* BLOC DROIT - SIDE CARD */}
        <div className="order-3 w-full max-w-[360px] h-[450px] shrink-0">
          <SideCard
            className="!w-full !max-w-none !min-w-0 h-full"
            imageSrc="/IMG-20260228-WA0000.jpg"
            title="Zy recherche un financement oriente workspace & Workflow "
            description="Exécution de la logique métier en latence..."
            location="Anyama, Abidjan , Côte d'Ivoire"
          />
        </div>
      </main>

      {/* INTÉGRATION CHIRURGICALE DU COMPOSANT NARRATIF 
          On remplace tout l'ancien bloc <section> par ton nouveau DataTexteIngeneering.
      */}
      <DataTexteIngeneering />

      {/* FOOTER FIXED DOCK : NAVIGATION BASSE */}
      <footer className="fixed bottom-0 left-0 right-0 z-[100] h-32 flex items-center justify-center pointer-events-none">
        <div className="relative pointer-events-auto">
          <Dock
            items={dockItems}
            iconSize={16}
            magnification={24}
            distance={80}
            className="bg-[var(--background)] border border-[var(--border-color)] shadow-2xl h-[46px] px-6 rounded-full"
          />
        </div>
      </footer>
    </div>
  );
}
