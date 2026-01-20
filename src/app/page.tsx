"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Loader from "@/components/Loader";
import { BackgroundRippleEffect } from "@/components/ui/BackgroundRippleEffect";
import { TextHoverEffect } from "@/components/ui/TextHoverEffect";
import SideCard from "@/components/SideCard";
import DataCard from "@/components/DataCard";
import { Info, ShieldCheck, Zap } from "lucide-react";
import Navbar from "@/components/NavbarFront";

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

      <main className="relative flex flex-col md:flex-row items-center justify-center min-h-screen overflow-hidden px-4 md:px-8 pb-10 gap-6 md:gap-0 pt-32 md:pt-40 bg-[#020408]">
        {/* Background Effet : On garde le Ripple mais avec une opacité réduite pour le look tech */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />
        </div>

        {/* Glow central pour rappeler l'atmosphère du globe */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full z-0" />

        {/* Carte Centrale de Connexion */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full md:w-[460px] max-w-[90vw]">
          <div className="w-full p-10 backdrop-blur-2xl rounded-3xl shadow-2xl bg-black/40 border border-white/10">
            <div className="flex justify-center mb-2">
              <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-2">
                <Zap className="w-3 h-3 text-green-500" />
                <span className="text-[10px] text-green-500 font-bold tracking-widest uppercase">
                  Système Actif
                </span>
              </div>
            </div>

            <TextHoverEffect
              text="Nonnzy"
              duration={0.6}
              style={{
                width: "100%",
                height: "120px",
                fontSize: "120px",
              }}
            />

            <p className="text-white/60 text-sm mb-10 tracking-wide">
              L'infrastructure de données nouvelle génération pour l'Afrique de
              l'Ouest.
            </p>

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full py-4 flex items-center justify-center gap-3 
              bg-white text-black font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)]
              hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-95 
              transition-all duration-300 mb-8"
            >
              <FcGoogle className="text-2xl" />
              Initialiser le Workflow
            </button>

            <div className="flex items-center justify-center gap-2 text-white/30 text-[10px] uppercase tracking-[0.2em]">
              <ShieldCheck className="w-3 h-3" />
              Authentification Sécurisée via Google Node
            </div>
          </div>
        </div>

        {/* Aside Gauche : Insights Data */}
        <aside className="relative z-20 md:absolute md:left-8 flex justify-center w-full md:w-auto">
          <DataCard
            width={320}
            height={300}
            title={
              <div className="flex items-center gap-2 text-white">
                <Info className="w-4 h-4 text-green-400" />
                <span className="font-bold text-xs uppercase tracking-wider">
                  Potentiel : Anyama
                </span>
              </div>
            }
            content={
              <div className="space-y-4 text-white/70 text-xs leading-relaxed">
                <p>
                  Les flux d'investissement convergent : Anyama devient le
                  nouveau
                  <span className="text-green-400 font-bold ml-1">
                    Hub Stratégique
                  </span>
                  . La data révèle un avantage invisible aux yeux des acteurs
                  classiques.
                </p>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 italic">
                  "Dans l'économie moderne, la donnée n'est pas une info, c'est
                  un actif financier."
                </div>
              </div>
            }
            buttonContent={
              <div className="w-full py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-[10px] font-bold uppercase tracking-widest hover:bg-green-500/20 transition-all text-center">
                Analyser les Flux
              </div>
            }
            modalContent={
              <div className="text-white/80 space-y-4">
                <h4 className="text-green-500 font-bold uppercase tracking-widest text-xs">
                  Rapport Stratégique
                </h4>
                <p>
                  La réduction des coûts structurels via l'IA et la précision
                  des données est estimée à 40% pour les administrations locales
                  d'ici 2026.
                </p>
              </div>
            }
          />
        </aside>

        {/* Aside Droit : Statut Zy */}
        <aside className="relative z-20 md:absolute md:right-8 flex justify-center w-full md:w-auto">
          <SideCard
            imageSrc="/zyy.png"
            title="Zy Node : Financement Workspace"
            description="Optimisation des pipelines de données et exécution des contrats intelligents en Côte d'Ivoire."
            location="Anyama Node, Abidjan"
          />
        </aside>
      </main>
    </>
  );
}
