"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Info, Home, Github, Linkedin } from "lucide-react";

import Loader from "@/components/frontendkit/Loader";
import { MasterAuroraBackground } from "@/components/ui/MasterAuroraBackground";
import { TextHoverEffect } from "@/components/ui/TextHoverEffect";
import SideCard from "@/components/frontendkit/SideCard";
import DataCard from "@/components/frontendkit/DataCard";
import Navbar from "@/components/frontendkit/NavbarFront";
import { Dock } from "@/components/ui/dock";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  if (status === "loading" || status === "authenticated") return <Loader />;

  return (
    <>
      <Navbar />

      <main className="relative flex flex-col md:flex-row items-center justify-center min-h-screen overflow-hidden px-4 md:px-8 pb-32 pt-32 md:pt-40 bg-app-gradient font-extralight">
        {/* Intégration de l'Aurora sans les props de grille pour la pureté visuelle */}
        <div className="absolute inset-0 z-0 select-none">
          <MasterAuroraBackground />
        </div>

        {/* SECTION CENTRALE : TEXT HOVER EFFECT ET CONNEXION */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full md:w-[460px] max-w-[90vw] min-w-[300px]">
          <div className="w-full p-10 backdrop-blur-2xl rounded-[40px] shadow-2xl bg-white/5 border border-white/10 dark:border-white/5 transition-all duration-700">
            <TextHoverEffect
              text="Nonnzytr"
              duration={0.6}
              style={{
                width: "min(100%, 1000px)",
                minWidth: "300px",
                height: "min(20vw, 400px)",
                minHeight: "300px",
                fontSize: "clamp(28rem, 28vw, 68rem)",
              }}
            />

            <p className="text-zinc-500 dark:text-zinc-400 text-base mb-8 uppercase tracking-[0.2em] font-extralight">
              Votre aventure commence ici
            </p>

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full py-4 flex items-center justify-center gap-3 
              bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-light rounded-full shadow-lg
              hover:opacity-90 hover:scale-[1.02] active:scale-95 
              transition-all duration-300 mb-6 tracking-widest uppercase text-xs"
            >
              <FcGoogle className="text-xl" />
              Continuer avec Google
            </button>

            <p className="text-zinc-500/50 text-[10px] italic tracking-wider font-extralight">
              Connexion sécurisée via Google requise pour accéder au Workflow.
            </p>
          </div>
        </div>

        {/* ASIDE GAUCHE : DATA CARD (FLUX COMPLET CONSERVÉ) */}
        <aside className="relative z-11 md:absolute md:left-3 md:ml-6 lg:ml-8 flex justify-center md:justify-start w-full md:w-auto min-w-[300px]">
          <DataCard
            width={300}
            height={270}
            title={
              <div className="flex items-center justify-center gap-2 text-foreground">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="font-light tracking-tight text-sm">
                  Data-driven growth : chaque flux, chaque métrique confirme le
                  potentiel d'Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col gap-1 text-foreground/70 text-sm overflow-auto max-h-[200px] md:max-h-[250px] font-extralight leading-relaxed">
                <p>
                  Les métriques d'attractivité et les flux d'investissement
                  convergent vers une réalité : le vrai potentiel se mesure dans
                  ce qui reste à révéler. Anyama dispose d'un avantage
                  stratégique encore invisible à la majorité des acteurs. La
                  data ne ment pas — la question, c'est qui l'exploitera en
                  premier. :{" "}
                  <span className="bg-gradient-to-r from-green-500 to-blue-300 bg-clip-text text-transparent font-normal">
                    Vision partagée
                  </span>
                </p>
                <p>
                  Les chiffres sont là. Les investisseurs arrivent. La question,
                  c'est : serez-vous prêts ?
                </p>
                <p>
                  Votre commune entre dans une zone d'attractivité stratégique :
                  <span className="bg-gradient-to-r from-green-500 to-blue-300 bg-clip-text text-transparent font-normal">
                    Sans insights, chaque décision est un pari perdu d'avance.
                  </span>
                </p>
              </div>
            }
            buttonContent={
              <div className="w-full py-2 flex items-center justify-center gap-2 bg-foreground/5 border border-border/50 rounded-full shadow-xl transition-all hover:bg-foreground/10 group">
                <span className="text-[10px] font-extralight uppercase tracking-[0.3em] text-foreground group-hover:scale-105 transition-all">
                  Comprendre
                </span>
              </div>
            }
            modalContent={
              <div className="flex flex-col gap-3 text-foreground/90 text-sm overflow-auto max-h-[400px] md:max-h-[450px] font-extralight p-2">
                <p>
                  Potentiel latent détecté : chaque flux, chaque indicateur
                  montre que votre territoire est sous-évalué.
                </p>
                <p>
                  La donnée est le premier moteur de croissance du XXIᵉ siècle.
                  Les économies modernes sont tirées par : la précision des
                  décisions, la rapiditée d'exécution, la capacité à anticiper
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

        {/* ASIDE DROIT : SIDE CARD */}
        <aside className="relative z-10 md:absolute md:right-3 md:mr-6 lg:mr-8 flex justify-center md:justify-end w-full md:w-auto min-w-[300px]">
          <SideCard
            imageSrc="/zyy.png"
            title="Zy recherche un financement orienté workspace & Workflow"
            description="Exécution de la logique métier et serveur en burn out."
            location="Anyama, Abidjan, Côte d'Ivoire"
          />
        </aside>

        {/* DOCK FLOTTANT ÉPURÉ - BORDER RADIUS FULL & GLASSMORPHISM */}
        <div className="fixed bottom-10 left-0 right-0 z-[100] flex justify-center pointer-events-none px-6">
          <div className="pointer-events-auto">
            <Dock
              items={[
                { icon: Home, href: "/", label: "Home" },
                { icon: Github, href: "https://github.com", label: "Github" },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com",
                  label: "Linkedin",
                },
              ]}
            />
          </div>
        </div>
      </main>
    </>
  );
}
