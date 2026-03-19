"use client";

import React, { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Info, Home, Github, Linkedin } from "lucide-react";

import Loader from "@/components/frontendkit/Loader";
import { MasterAuroraBackground } from "@/components/ui/MasterAuroraBackground";
import SideCard from "@/components/frontendkit/SideCard";
import DataCard from "@/components/frontendkit/DataCard";
import Navbar from "@/components/frontendkit/NavbarFront";
import LoginCard from "@/components/frontendkit/LoginCard";
import { Dock, type DockItem } from "@/components/ui/dock";
import { cn } from "@/lib/utils";

// L'import du composant pour l'analyse
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

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

      {/* MAIN LAYOUT : TA STRUCTURE INITIALE STRICTE */}
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
              <div className="flex flex-col h-[350px] text-left">
                <div className="flex-grow overflow-y-auto pr-2 scrollbar-hide">
                  <div className="flex flex-col gap-4 text-[var(--foreground)] text-[14px] leading-relaxed">
                    <p>
                      Les métriques d'attractivité et les flux d'investissement
                      convergent vers une réalité : le vrai potentiel se mesure
                      dans ce qui reste à révéler. Anyama dispose d'un avantage
                      stratégique encore invisible à la majorité des acteurs. La
                      data ne ment pas — la question, c'est qui l'exploitera en
                      premier :{" "}
                      <span className="text-emerald-500 font-bold">
                        Vision partagée
                      </span>
                    </p>
                    <p>
                      Les chiffres sont là. Les investisseurs arrivent. La
                      question, c'est : serez-vous prêts ?
                    </p>
                    <p>
                      Votre commune entre dans une zone d'attractivité
                      stratégique :{" "}
                      <span className="text-emerald-500 font-bold italic">
                        Sans insights, chaque décision est un pari perdu
                        d'avance.
                      </span>
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
            modalContent={
              <div className="space-y-4">
                <p className="font-bold text-blue-400 uppercase tracking-widest text-[10px]">
                  Argumentaire Financement
                </p>
                <p>
                  Potentiel latent détecté : chaque flux, chaque indicateur
                  montre que votre territoire est sous-évalué.
                </p>
                <p>
                  La donnée est le premier moteur de croissance du XXIe siècle.
                  Investir dans la donnée n'est pas une dépense : c'est un
                  amortisseur de dépenses futures.
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
            title="Zy recherche un financement orienté workspace & Workflow"
            description="Exécution de la logique métier et serveur en burn out."
            location="Anyama, Abidjan, Côte d'Ivoire"
          />
        </div>
      </main>

      {/* SECTION SUPPLÉMENTAIRE : INSERTION RADICALE EN DESSOUS DU FLUX INITIAL */}
      <section className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-12 pb-64">
        <div className="border-t border-[var(--border-color)] pt-16">
          <TextGenerateEffect
            duration={0.3}
            className="text-[var(--foreground)] text-lg md:text-xl leading-relaxed text-justify opacity-80"
            words="Anyama : Hub industriel et logistique stratégique – opportunité unique. Anyama est prête à devenir un centre économique majeur en Côte d’Ivoire. Les infrastructures et atouts existants en font un site où chaque investissement se transforme en valeur mesurable et scalable. Industries existantes : ciment et métallurgie, capables de générer des synergies industrielles et logistiques. Zone industrielle prête à accueillir des expansions. Avantage logistique stratégique Y4, garantissant des flux fiables et rapides pour les marchandises. Projet stade : vecteur de renommée permanent, augmentant l’attractivité de la commune pour investisseurs et partenaires stratégiques. Chaque levier combiné crée un écosystème industrialo-logistique capable de croître rapidement, de sécuriser les flux et de multiplier les retours sur investissement. 1️⃣ Stade : vecteur de renommée et attractivité constante. Le stade ne se limite pas aux événements. Il devient un signal permanent de dynamisme et de modernité : Visibilité continue : attire partenaires, investisseurs et médias. Crédibilité immédiate : tout projet à proximité bénéficie d’une image premium. Effet multiplicateur : même en l’absence d’événements, le stade crée un flux indirect constant vers la commune (emplois, transport, services). Les investisseurs comprennent que le stade transcende son usage sportif et agit comme un levier d’attractivité stratégique permanent, capable de valoriser chaque nouveau projet. 2️⃣ Industries : vecteurs de scalabilité et création de valeur. Ciment : support des infrastructures, projets de construction, extension industrielle et urbaine. Métallurgie : produit des équipements pour d’autres industries. Zone industrielle : centralise et mutualise services logistiques, énergie, RH. 3️⃣ Y4 : levier logistique stratégique. Optimise le transport des matières premières et produits finis. Sécurise les débouchés. Y4 transforme Anyama en hub logistique régional. 4️⃣ IT et tunnel de conversion data-driven : moteur décisionnel. Une plateforme IT intégrée à la mairie, couplée à une IA, permet de : Centraliser et analyser chaque projet et flux industriel. Identifier les synergies. Simuler et sécuriser les investissements avant leur implémentation. 5️⃣ Conclusion stratégique. Anyama combine industries, logistique, infrastructure et renommée pour créer un hub économique et urbain scalable : Les industries existantes sont des catalyseurs de croissance. Y4 sécurise les flux logistiques. Le stade agit comme un vecteur de renommée permanent. Le tunnel IT transforme chaque donnée en décision stratégique fiable et rentable. Investir à Anyama, c’est saisir une opportunité rare où chaque projet s’intègre dans un écosystème générant des retours tangibles et exponentiels. La décision stratégique est claire : agir maintenant permet d’être les premiers à bénéficier de ce hub industriel et logistique unique en Côte d’Ivoire."
          />
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
