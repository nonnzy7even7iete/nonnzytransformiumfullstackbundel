"use client";

import React, { useEffect, useMemo } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Info, Home, Github, Linkedin } from "lucide-react";

import Loader from "@/components/frontendkit/Loader";
import { MasterAuroraBackground } from "@/components/ui/MasterAuroraBackground";
import { TextHoverEffect } from "@/components/ui/TextHoverEffect";
import SideCard from "@/components/frontendkit/SideCard";
import DataCard from "@/components/frontendkit/DataCard";
import Navbar from "@/components/frontendkit/NavbarFront";
import { Dock, type DockItem } from "@/components/ui/dock";

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
    <div className="relative min-h-screen flex flex-col bg-app-gradient overflow-hidden">
      <Navbar />

      {/* BACKGROUND FIXE SANS COUPURE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MasterAuroraBackground />
      </div>

      {/* LAYOUT PROPORTIONNEL : TOUS LES BLOCS À HAUTEUR 350PX */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center px-4 md:px-10 gap-6 pt-32 pb-40">
        {/* DATA CARD (350x350) + SCROLL INTERNE */}
        <div className="w-[350px] h-[350px] flex shrink-0">
          <DataCard
            width={350}
            height={350}
            title={
              <div className="flex items-center gap-2 text-foreground">
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-semibold text-xs leading-tight">
                  Data-driven growth : chaque flux, chaque métrique confirme le
                  potentiel d'Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col gap-3 text-foreground/80 text-sm leading-relaxed overflow-y-auto max-h-[180px] pr-2 scrollbar-hide">
                <p>
                  Les métriques d'attractivité et les flux d'investissement
                  convergent vers une réalité : le vrai potentiel se mesure dans
                  ce qui reste à révéler. Anyama dispose d'un avantage
                  stratégique encore invisible à la majorité des acteurs. La
                  data ne ment pas — la question, c'est qui l'exploitera en
                  premier :{" "}
                  <span className="bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent font-bold inline-block">
                    Vision partagée
                  </span>
                </p>
                <p>
                  Les chiffres sont là. Les investisseurs arrivent. La question,
                  c'est : serez-vous prêts ?
                </p>
                <p>
                  Votre commune entre dans une zone d'attractivité stratégique :{" "}
                  <span className="bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent font-bold inline-block">
                    Sans insights, chaque décision est un pari perdu d'avance.
                  </span>
                </p>
              </div>
            }
            buttonContent={
              <span className="text-xs font-bold uppercase tracking-widest">
                Comprendre
              </span>
            }
            modalContent={
              <div className="space-y-4 text-foreground/90 overflow-y-auto max-h-[300px] pr-2">
                <p>
                  Potentiel latent détecté : chaque flux, chaque indicateur
                  montre que votre territoire est sous-évalué.
                </p>
                <p>
                  La donnée est le premier moteur de croissance du XXIᵉ siècle.
                  Les économies modernes sont tirées par : la précision des
                  décisions, la rapiditée d'exécution, la capacité à anticiper
                  les crises plutôt que les subir.
                </p>
                <p>
                  La donnée réduit les coûts structurels de l'État (et ce de
                  façon massive). Investir dans la donnée n'est pas une dépense
                  : c'est un amortisseur de dépenses futures.
                </p>
              </div>
            }
          />
        </div>

        {/* CONNEXION CARD (400x350) + CENTRAGE TOTAL */}
        <div className="w-[400px] h-[350px] p-8 backdrop-blur-3xl rounded-2xl bg-glass-dual border border-border-dual flex flex-col items-center justify-center text-center shadow-none shrink-0">
          <div className="w-full h-40 flex items-center justify-center overflow-visible">
            <TextHoverEffect
              text="Nonnzytr"
              duration={0.6}
              style={{
                width: "140%",
                height: "100%",
                fontSize: "clamp(6rem, 15vw, 10rem)",
              }}
            />
          </div>

          <div className="mt-4 flex flex-col items-center w-full">
            <p className="text-foreground/70 text-xs mb-6 tracking-[0.3em] uppercase font-light">
              Votre aventure commence ici
            </p>
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full py-3.5 flex items-center justify-center gap-3 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              <FcGoogle className="text-xl" />
              <span className="text-xs tracking-wider font-black">
                CONTINUER
              </span>
            </button>
          </div>
        </div>

        {/* SIDE CARD (350x350) */}
        <div className="w-[350px] h-[350px] flex shrink-0">
          <SideCard
            imageSrc="/zyy.png"
            title="Zy recherche un financement orienté workspace & Workflow"
            description="Exécution de la logique métier et serveur en burn out."
            location="Anyama, Abidjan, Côte d'Ivoire"
          />
        </div>
      </main>

      {/* FOOTER : GLASSMORPHISM UNIFIÉ AU BACKGROUND */}
      <footer className="fixed bottom-0 left-0 right-0 z-[100] h-24 flex items-center justify-center pointer-events-none">
        {/* Gradient d'occlusion qui utilise les couleurs du flux (app-gradient) */}
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-background/90 via-background/40 to-transparent z-[-1]" />

        <div className="relative pointer-events-auto">
          <Dock
            items={dockItems}
            iconSize={15}
            magnification={22}
            distance={70}
            // Glassmorphism pur sans ombre pour ne pas casser le background
            className="bg-glass-dual border border-border-dual shadow-none backdrop-blur-3xl h-[42px] px-6 rounded-full"
          />
        </div>
      </footer>
    </div>
  );
}
