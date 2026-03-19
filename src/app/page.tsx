"use client";

import React, { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Info,
  Home,
  Github,
  Linkedin,
  Target,
  Zap,
  Activity,
} from "lucide-react";

import Loader from "@/components/frontendkit/Loader";
import { MasterAuroraBackground } from "@/components/ui/MasterAuroraBackground";
import SideCard from "@/components/frontendkit/SideCard";
import DataCard from "@/components/frontendkit/DataCard";
import Navbar from "@/components/frontendkit/NavbarFront";
import LoginCard from "@/components/frontendkit/LoginCard";
import { Dock, type DockItem } from "@/components/ui/dock";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"; // Assure-toi du chemin
import TerminalDynamiqueSouverain from "@/components/TerminalDynamiqueSouverain";
import { cn } from "@/lib/utils";

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

      {/* MAIN HERO LAYOUT */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center lg:justify-center px-4 lg:px-2 gap-6 pt-32 pb-20 w-full max-w-[1280px] mx-auto">
        <div className="order-2 lg:order-1 w-full max-w-[360px] h-[450px] shrink-0">
          <DataCard
            height={450}
            className="!w-full !max-w-none !min-w-0 h-full"
            title={
              <div className="flex items-center gap-2 text-[var(--foreground)]">
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-bold text-[13px] leading-tight uppercase tracking-tighter">
                  Data-driven growth : potentiel d'Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col h-[350px] text-left">
                <div className="flex-grow overflow-y-auto pr-2 scrollbar-hide">
                  <div className="flex flex-col gap-4 text-[var(--foreground)] text-[14px] leading-relaxed">
                    <p>
                      Les métriques d'attractivité et les flux d'investissement
                      convergent...
                    </p>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-[var(--border-color)]">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                    Explorer la data
                  </span>
                </div>
              </div>
            }
          />
        </div>

        <div className="order-1 lg:order-2 w-full max-w-[440px] h-[450px] shrink-0">
          <LoginCard className="!w-full !max-w-none !min-w-0 h-full" />
        </div>

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

      {/* SECTION NOUVELLE : ANALYSE STRATÉGIQUE ANYAMA */}
      <section className="relative z-10 w-full max-w-[1250px] mx-auto px-6 pb-44 space-y-24">
        {/* 1. EFFET DE GÉNÉRATION DE TEXTE (INTRO) */}
        <div className="max-w-4xl">
          <TextGenerateEffect
            words="Anyama : Hub industriel et logistique stratégique – opportunité unique. Anyama est prête à devenir un centre économique majeur en Côte d’Ivoire."
            className="text-[#10b981] font-black uppercase tracking-tighter"
          />
          <p className="mt-6 text-[var(--foreground)] opacity-70 text-lg leading-relaxed max-w-2xl font-medium">
            Les infrastructures et atouts existants en font un site où chaque
            investissement se transforme en valeur mesurable et scalable.
          </p>
        </div>

        {/* 2. LE GRAPHIQUE DE SOUVERAINETÉ (RECHARTS) */}
        <div className="w-full">
          <TerminalDynamiqueSouverain
            titre="Anyama Hub"
            secteur="Développement Urbain & Logistique"
          />
        </div>

        {/* 3. GRILLE D'ANALYSE DÉTAILLÉE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-[var(--foreground)]">
          {/* Bloc 1 : Le Stade */}
          <div className="p-8 border border-[var(--border-color)] bg-[var(--card-bg-glass)] rounded-[var(--radius-vercel-zy)] backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6 text-[#10b981]">
              <Target className="w-6 h-6" />
              <h2
                className="text-xl font-black uppercase italic tracking-tighter"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                1️⃣ Le Stade : Vecteur de Renommée
              </h2>
            </div>
            <p className="text-sm opacity-80 leading-relaxed italic mb-4">
              "Le stade transcende son usage sportif et agit comme un levier
              d’attractivité stratégique permanent."
            </p>
            <ul className="space-y-3 text-[13px] font-medium opacity-60">
              <li>• Visibilité continue pour partenaires et investisseurs.</li>
              <li>• Crédibilité immédiate pour tout projet premium.</li>
              <li>
                • Effet multiplicateur sur les flux indirects (emplois,
                services).
              </li>
            </ul>
          </div>

          {/* Bloc 2 : Industries */}
          <div className="p-8 border border-[var(--border-color)] bg-[var(--card-bg-glass)] rounded-[var(--radius-vercel-zy)] backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6 text-orange-500">
              <Zap className="w-6 h-6" />
              <h2
                className="text-xl font-black uppercase italic tracking-tighter"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                2️⃣ Industries : Scalabilité & Valeur
              </h2>
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-4">
              Ciment, Métallurgie et Zone Industrielle mutualisée pour réduire
              les coûts RH et énergie.
            </p>
            <div className="grid grid-cols-2 gap-4 text-[11px] font-black uppercase tracking-widest">
              <div className="p-3 border border-orange-500/20 rounded">
                Ciment : Infrastructure
              </div>
              <div className="p-3 border border-orange-500/20 rounded">
                Métallurgie : Équipements
              </div>
            </div>
          </div>

          {/* Bloc 3 : Y4 & Logistique */}
          <div className="md:col-span-2 p-10 border border-[var(--border-color)] bg-gradient-to-br from-[var(--card-bg)] to-transparent rounded-[var(--radius-vercel-zy)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="max-w-md">
                <div className="flex items-center gap-3 mb-4 text-blue-400">
                  <Activity className="w-6 h-6" />
                  <h2
                    className="text-2xl font-black uppercase italic tracking-tighter"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    3️⃣ Y4 : Levier Logistique
                  </h2>
                </div>
                <p className="text-sm opacity-70 leading-relaxed">
                  L'autoroute Y4 transforme Anyama en hub régional, optimisant
                  le transport des matières premières et sécurisant les
                  débouchés industriels.
                </p>
              </div>
              <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] block mb-2 opacity-50">
                  Status Réseau
                </span>
                <span className="text-2xl font-black text-blue-400 tabular-nums">
                  FLUX SÉCURISÉS 100%
                </span>
              </div>
            </div>
          </div>

          {/* Conclusion IT */}
          <div className="md:col-span-2 text-center py-20 border-t border-[var(--border-color)]">
            <h2
              className="text-3xl font-black uppercase tracking-tighter mb-8 italic"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              4️⃣ Conclusion Stratégique :{" "}
              <span className="text-[#10b981]">Agir Maintenant</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg opacity-80 font-medium leading-relaxed">
              Investir à Anyama, c’est saisir une opportunité rare où chaque
              projet s’intègre dans un écosystème générant des retours tangibles
              et exponentiels. Le tunnel IT transforme chaque donnée en décision
              stratégique.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER FIXED */}
      <footer className="fixed bottom-0 left-0 right-0 z-[100] h-32 flex items-center justify-center pointer-events-none">
        <div className="relative pointer-events-auto">
          <Dock
            items={dockItems}
            iconSize={16}
            magnification={24}
            distance={80}
            className="bg-[var(--background)] border border-[var(--border-color)] shadow-xl h-[46px] px-6 rounded-full"
          />
        </div>
      </footer>
    </div>
  );
}
