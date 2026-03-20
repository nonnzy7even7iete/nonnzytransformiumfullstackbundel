"use client";

import React, { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Info, Home, Github, Linkedin } from "lucide-react";

import Loader from "@/components/frontendkit/ui/Loader";
import { MasterAuroraBackground } from "@/components/frontendkit/ui/MasterAuroraBackground";
import SideCard from "@/components/frontendkit/ui/SideCard";
import DataCard from "@/components/frontendkit/ui/DataCard";
import Navbar from "@/components/frontendkit/ui/NavbarFront";
import LoginCard from "@/components/frontendkit/ui/LoginCard";
import { Dock, type DockItem } from "@/components/frontendkit/ui/dock";
import { cn } from "@/lib/utils";

// L'import du composant hybride (supporte children maintenant)
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
        {/* BLOC GAUCHE - DATA CARD */}
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
              <div className="flex flex-col h-[350px] text-left text-[var(--foreground)]">
                <p className="text-[14px] leading-relaxed">
                  Le vrai potentiel se mesure dans ce qui reste à révéler.
                  Anyama dispose d'un avantage stratégique encore invisible.
                </p>
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

      {/* SECTION FLUX ANYAMA : TYPOGRAPHIE STYLE Documentation Shadcn */}
      <section className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-12 pb-64">
        <div className="border-t border-[var(--border-color)] pt-20">
          <TextGenerateEffect className="text-[var(--foreground)]">
            {/* TITRE H1 */}
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 border-b pb-4 border-emerald-500/20">
              Anyama : Hub industriel et logistique stratégique –{" "}
              <span className="text-emerald-500">opportunité unique</span>
            </h1>

            <p className="leading-7 [&:not(:first-child)]:mt-6 text-xl opacity-90">
              Anyama est prête à devenir un centre économique majeur en Côte
              d'Ivoire. Les infrastructures et atouts existants en font un site
              où chaque investissement se transforme en valeur mesurable et
              scalable.
            </p>

            {/* LISTE DOCS */}
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-emerald-400/80 font-medium">
              <li>Industries existantes : ciment et métallurgie.</li>
              <li>Zone industrielle prête à accueillir des expansions.</li>
              <li>Avantage logistique stratégique Y4.</li>
              <li>Projet stade : vecteur de renommée permanent.</li>
            </ul>

            <div className="mt-16 space-y-12">
              <section>
                <h2 className="scroll-m-20 border-b border-[var(--border-color)] pb-2 text-3xl font-semibold tracking-tight">
                  1️⃣ Stade : Vecteur de renommée
                </h2>
                <p className="leading-7 mt-4">
                  Visibilité continue, crédibilité immédiate, et effet
                  multiplicateur constant vers la commune.
                </p>
              </section>

              <section>
                <h2 className="scroll-m-20 border-b border-[var(--border-color)] pb-2 text-3xl font-semibold tracking-tight">
                  2️⃣ Industries : Scalabilité
                </h2>
                <blockquote className="mt-6 border-l-2 border-emerald-500 pl-6 italic opacity-80">
                  "Chaque tonne produite soutient des projets supplémentaires et
                  crée un flux économique croissant."
                </blockquote>
              </section>

              <section>
                <h2 className="scroll-m-20 border-b border-[var(--border-color)] pb-2 text-3xl font-semibold tracking-tight">
                  3️⃣ Y4 & 4️⃣ IT Data-Driven
                </h2>
                <p className="leading-7 mt-4">
                  Y4 transforme Anyama en hub régional. Le tunnel IT/IA
                  centralise chaque projet pour simuler et sécuriser les
                  investissements avant leur implémentation.
                </p>
              </section>

              {/* CONCLUSION FINALE */}
              <section className="bg-emerald-500/5 p-8 md:p-12 rounded-[2rem] border border-emerald-500/10 mt-20">
                <h2 className="text-2xl font-black uppercase tracking-widest text-emerald-500 mb-6">
                  5️⃣ Conclusion stratégique
                </h2>
                <p className="text-xl md:text-2xl font-bold leading-relaxed">
                  Investir à Anyama, c'est saisir une opportunité rare. Chaque
                  projet s'intègre dans un écosystème générant des retours
                  tangibles et exponentiels.{" "}
                  <span className="underline decoration-emerald-500 underline-offset-8">
                    Agir maintenant.
                  </span>
                </p>
              </section>
            </div>
          </TextGenerateEffect>
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
