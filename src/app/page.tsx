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
    <div className="relative min-h-screen flex flex-col bg-app-gradient overflow-x-hidden">
      <Navbar />

      {/* BACKGROUND FIXE SANS INTERFÉRENCE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MasterAuroraBackground />
      </div>

      <main className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center px-4 md:px-8 pt-20 pb-48 gap-10">
        {/* ASIDE GAUCHE : DATA CARD (TEXTES COMPLETS) */}
        <aside className="w-full md:w-auto flex justify-center lg:absolute lg:left-8 xl:left-16 lg:top-1/2 lg:-translate-y-1/2">
          <DataCard
            width={320}
            height={320}
            title={
              <div className="flex items-center gap-2 text-foreground">
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-semibold text-[13px] leading-tight">
                  Data-driven growth : chaque flux, chaque métrique confirme le
                  potentiel d'Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col gap-3 text-foreground/80 text-[13px] leading-relaxed font-light text-justify">
                <p>
                  Les métriques d'attractivité et les flux d'investissement
                  convergent vers une réalité : le vrai potentiel se mesure dans
                  ce qui reste à révéler. Anyama dispose d'un avantage
                  stratégique encore invisible à la majorité des acteurs. La
                  data ne ment pas — la question, c'est qui l'exploitera en
                  premier :{" "}
                  <span className="bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent font-bold">
                    Vision partagée
                  </span>
                </p>
                <p>
                  Les chiffres sont là. Les investisseurs arrivent. La question,
                  c'est : serez-vous prêts ?
                </p>
                <p>
                  Votre commune entre dans une zone d'attractivité stratégique :{" "}
                  <span className="bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent font-bold">
                    Sans insights, chaque décision est un pari perdu d'avance.
                  </span>
                </p>
              </div>
            }
            buttonContent={
              <div className="w-full py-2 bg-foreground/5 border border-border rounded-xl text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-foreground/10 transition-all text-center">
                Comprendre
              </div>
            }
            modalContent={
              <div className="space-y-4 text-foreground/90 text-sm font-light p-4 text-justify">
                <p>
                  Potentiel latent détecté : chaque flux, chaque indicateur
                  montre que votre territoire est sous-évalué.
                </p>
                <p>
                  La donnée est le premier moteur de croissance du XXIᵉ siècle.
                  Les économies modernes sont tirées par : la précision des
                  décisions, la rapidité d'exécution, la capacité à anticiper
                  les crises plutôt que les subir. Or, tout cela dépend de la
                  donnée.
                </p>
                <p>
                  La donnée réduit les coûts structurels de l'État (et ce de
                  façon massive). Les administrations gèrent des millions de
                  micro-décisions quotidiennes... Investir dans la donnée n'est
                  pas une dépense : c'est un amortisseur de dépenses futures.
                </p>
              </div>
            }
          />
        </aside>

        {/* SECTION CENTRALE : LOGIN BOX CENTRÉE & LOGO RESPONSIVE */}
        <section className="relative z-20 flex flex-col items-center justify-center w-full md:w-[500px]">
          <div className="w-full p-10 md:p-14 backdrop-blur-3xl rounded-3xl bg-glass-dual border border-border-dual shadow-none flex flex-col items-center">
            <div className="w-full h-48 md:h-72 flex items-center justify-center">
              <TextHoverEffect
                text="Nonnzytr"
                duration={0.6}
                style={{
                  width: "100%",
                  height: "100%",
                  fontSize: "clamp(8rem, 20vw, 14rem)", // Taille massive pour mobile
                }}
              />
            </div>

            <div className="w-full flex flex-col items-center text-center -mt-4">
              <p className="text-foreground text-base mb-10 font-light tracking-[0.3em] uppercase">
                Votre aventure commence ici
              </p>

              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full max-w-sm py-4 flex items-center justify-center gap-4 bg-foreground text-background font-bold rounded-2xl shadow-none transition-all hover:opacity-90 active:scale-95"
              >
                <FcGoogle className="text-2xl" />
                <span className="tracking-widest">CONTINUER AVEC GOOGLE</span>
              </button>

              <p className="mt-8 text-foreground/40 text-[10px] italic tracking-wider">
                Connexion sécurisée via Google requise pour accéder au Workflow.
              </p>
            </div>
          </div>
        </section>

        {/* ASIDE DROIT : SIDE CARD (TEXTE INTÉGRAL) */}
        <aside className="w-full md:w-auto flex justify-center lg:absolute lg:right-8 xl:right-16 lg:top-1/2 lg:-translate-y-1/2">
          <SideCard
            imageSrc="/zyy.png"
            title="Zy recherche un financement orienté workspace & Workflow"
            description="Exécution de la logique métier et serveur en burn out."
            location="Anyama, Abidjan, Côte d'Ivoire"
          />
        </aside>
      </main>

      {/* FOOTER : DESIGN IDENTIQUE, SANS SHADOW, AVEC OCCLUSION BRUMEUSE */}
      <footer className="fixed bottom-0 left-0 right-0 z-[100] h-24 flex items-center justify-center pointer-events-none">
        {/* Zone de brume pour masquer le texte au scroll */}
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-background via-background/90 to-transparent z-[-1]" />

        <div className="relative pointer-events-auto">
          <Dock
            items={dockItems}
            iconSize={15}
            magnification={22}
            distance={70}
            className="bg-glass-dual border border-border-dual shadow-none backdrop-blur-3xl"
          />
        </div>
      </footer>
    </div>
  );
}
