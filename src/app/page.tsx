"use client";

import React, { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Info, Home, Github, Linkedin } from "lucide-react";

// Imports synchronisés avec ton arborescence réelle (Capture d'écran)
import Loader from "@/components/frontendkit/ui/Loader";
import { MasterAuroraBackground } from "@/components/frontendkit/ui/MasterAuroraBackground";
import SideCard from "@/components/frontendkit/ui/SideCard";
import DataCard from "@/components/frontendkit/ui/DataCard";
import Navbar from "@/components/frontendkit/ui/NavbarFront";
import LoginCard from "@/components/frontendkit/ui/LoginCard";
import { Dock, type DockItem } from "@/components/frontendkit/ui/dock";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "@/components/frontendkit/ui/text-generate-effect";

export default function HomePage() {
  const { status } = useSession();
  const router = useRouter();

  const dockItems: DockItem[] = useMemo(
    () => [
      { icon: Home, href: "/", label: "H" },
      { icon: Github, href: "https://github.com", label: "G" },
      { icon: Linkedin, href: "https://linkedin.com", label: "L" },
    ],
    []
  );

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  if (status === "loading" || status === "authenticated") return <Loader />;

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--background)] overflow-x-hidden">
      <Navbar />

      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MasterAuroraBackground />
      </div>

      {/* MAIN LAYOUT : STRUCTURE INITIALE PRÉSERVÉE */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center lg:justify-center px-4 lg:px-2 gap-6 pt-32 pb-44 w-full max-w-[1280px] mx-auto">
        {/* BLOC GAUCHE - DATA CARD (CONTENU LITTÉRAL RESTAURÉ) */}
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
            title="Zy recherche un financement"
            description="Exécution de la logique métier."
            location="Anyama, Abidjan"
          />
        </div>
      </main>

      {/* SECTION NARRATIVE ANYAMA : UI LOGIQUE & PROFESSIONNELLE */}
      <section className="relative z-10 w-full max-w-[1100px] mx-auto px-6 lg:px-16 pb-64">
        <div className="border-t border-[var(--border-color)] pt-32">
          <TextGenerateEffect className="text-[var(--foreground)]">
            {/* HEADER DESIGN */}
            <header className="mb-24 space-y-8">
              <h1 className="animate-target opacity-0 text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-12">
                Anyama : Hub industriel et logistique stratégique
              </h1>
              <p className="animate-target opacity-0 text-xl md:text-2xl leading-relaxed max-w-4xl opacity-80 font-medium">
                Anyama est prête à devenir un centre économique majeur en Côte
                d’Ivoire. Les infrastructures et atouts existants en font un
                site où chaque investissement se transforme en valeur mesurable
                et scalable.
              </p>
            </header>

            {/* SYNERGIES INDUSTRIELLES (GRILLE V-CARD) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-color)] border border-[var(--border-color)] mb-32">
              {[
                "Industries existantes : ciment et métallurgie, synergies industrielles et logistiques prêtes.",
                "Zone industrielle optimisée pour accueillir des expansions majeures sans friction.",
                "Avantage Y4 : La colonne vertébrale logistique garantissant des flux fiables et rapides.",
                "Vecteur Stade : Un signal permanent de dynamisme attirant médias et partenaires stratégiques.",
              ].map((text, i) => (
                <div
                  key={i}
                  className="bg-[var(--background)] p-10 group hover:bg-[var(--accents-1)] transition-colors duration-300"
                >
                  <p className="animate-target opacity-0 text-sm leading-relaxed font-mono tracking-tight opacity-70 italic">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* ANALYSE DÉTAILLÉE PAR LEVIERS */}
            <div className="space-y-40">
              {/* LEVIER 01 - STADE */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-l border-[var(--border-color)] pl-8 lg:pl-0 lg:border-none">
                <div className="lg:col-span-4 lg:text-right lg:pr-12 lg:border-r lg:border-[var(--border-color)]">
                  <h2 className="animate-target opacity-0 text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-6">
                    Levier 01 / Attractivité
                  </h2>
                  <h3 className="animate-target opacity-0 text-3xl font-bold tracking-tighter">
                    Vecteur de renommée
                  </h3>
                </div>
                <div className="lg:col-span-8 space-y-8">
                  <p className="animate-target opacity-0 text-lg leading-relaxed opacity-80">
                    Le stade transcende son usage sportif. Il devient un signal
                    de modernité créant un flux indirect constant vers la
                    commune (emplois, transport, services).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm opacity-60">
                    <div className="animate-target opacity-0">
                      <p className="font-bold mb-2 text-[var(--foreground)] uppercase">
                        Visibilité
                      </p>
                      <p>
                        Attire continuellement partenaires et investisseurs
                        stratégiques.
                      </p>
                    </div>
                    <div className="animate-target opacity-0">
                      <p className="font-bold mb-2 text-[var(--foreground)] uppercase">
                        Crédibilité
                      </p>
                      <p>
                        Tout projet adjacent bénéficie instantanément d'une
                        image premium.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* LEVIER 02 - SCALABILITÉ */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-l border-[var(--border-color)] pl-8 lg:pl-0 lg:border-none">
                <div className="lg:col-span-4 lg:text-right lg:pr-12 lg:border-r lg:border-[var(--border-color)]">
                  <h2 className="animate-target opacity-0 text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-6">
                    Levier 02 / Croissance
                  </h2>
                  <h3 className="animate-target opacity-0 text-3xl font-bold tracking-tighter">
                    Scalabilité & Valeur
                  </h3>
                </div>
                <div className="lg:col-span-8">
                  <p className="animate-target opacity-0 text-lg leading-relaxed opacity-80 mb-10">
                    Ciment et métallurgie : moteurs internes permettant de
                    scaler les projets industriels sans dépendance externe.
                    Chaque tonne produite soutient l'extension urbaine.
                  </p>
                  <div className="v-card p-8 animate-target opacity-0 border-emerald-500/20 bg-emerald-500/[0.01]">
                    <p className="text-base leading-relaxed italic opacity-80 font-medium">
                      "Y4 transforme Anyama en hub logistique régional, où les
                      investisseurs peuvent croître sans limites géographiques."
                    </p>
                  </div>
                </div>
              </div>

              {/* LEVIER 03 - DATA ENGINE */}
              <div className="py-24 border-y border-[var(--border-color)] text-center space-y-12">
                <h2 className="animate-target opacity-0 text-xs font-black uppercase tracking-[0.5em] text-emerald-500">
                  Engine / IT & Data-Driven
                </h2>
                <h3 className="animate-target opacity-0 text-4xl md:text-5xl font-black tracking-tighter max-w-4xl mx-auto leading-[1.1]">
                  Simuler et sécuriser le ROI avant chaque implémentation
                  stratégique.
                </h3>
                <p className="animate-target opacity-0 text-lg opacity-60 max-w-2xl mx-auto font-medium">
                  Notre plateforme IA centralise les flux pour identifier les
                  synergies et garantir un alignement stratégique total avec le
                  développement urbain.
                </p>
              </div>

              {/* CONCLUSION FINALE */}
              <footer className="pt-20 text-center space-y-12">
                <h2 className="animate-target opacity-0 text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">
                  Agir Maintenant.
                </h2>
                <p className="animate-target opacity-0 text-xl md:text-2xl font-bold opacity-80 max-w-3xl mx-auto leading-relaxed">
                  Investir à Anyama, c’est saisir une opportunité rare où chaque
                  projet s’intègre dans un écosystème générant des retours
                  tangibles et exponentiels.
                </p>
                <div className="animate-target opacity-0 inline-flex items-center gap-4 px-10 py-5 bg-[var(--foreground)] text-[var(--background)] rounded-full text-xs font-black uppercase tracking-[0.3em] hover:scale-105 transition-transform duration-300 cursor-default">
                  Décision Stratégique : Prioritaire
                </div>
              </footer>
            </div>
          </TextGenerateEffect>
        </div>
      </section>

      {/* FOOTER FIXED DOCK */}
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
