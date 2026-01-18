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
import { Info } from "lucide-react";
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

      <main
        className="relative flex flex-col md:flex-row items-center justify-center 
  min-h-screen overflow-hidden px-4 md:px-8 pb-10 gap-6 md:gap-0 pt-32 md:pt-40
  bg-app-gradient"
      >
        <div className="absolute inset-0 z-0">
          <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />
        </div>

        {/* Bloc Connexion */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full md:w-[460px] max-w-[90vw] min-w-[300px]">
          <div className="w-full p-10 backdrop-blur-xl rounded-2xl shadow-2xl bg-glass-dual border border-border-dual">
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

            <p className="text-black dark:text-white text-base mb-8 font-medium">
              Votre aventure commence ici ✨
            </p>

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full py-3 flex items-center justify-center gap-2 
              bg-black text-white dark:bg-white dark:text-black font-semibold rounded-xl shadow-md
              hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 mb-6"
            >
              <FcGoogle className="text-2xl" />
              Continuer avec Google
            </button>

            <p className="text-black/50 dark:text-white/50 text-xs italic">
              Connexion sécurisée via Google requise pour accéder au Workflow.
            </p>
          </div>
        </div>

        {/* DataCard avec le bouton Comprendre personnalisé */}
        <aside className="relative z-11 md:absolute md:left-3 md:ml-6 lg:ml-8 flex justify-center md:justify-start w-full md:w-auto min-w-[300px]">
          <DataCard
            width={300}
            height={270}
            title={
              <div className="flex items-center justify-center gap-2 text-foreground">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-white">
                  Data-driven growth : chaque flux, chaque métrique confirme le
                  potentiel d'Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col gap-1 text-white/80 text-sm overflow-auto max-h-[200px]">
                <p>
                  Les métriques d'attractivité convergent vers une réalité : le
                  potentiel se mesure dans ce qui reste à révéler. Anyama
                  dispose d'un avantage stratégique. :{" "}
                  <span className="bg-gradient-to-r from-green-400 to-blue-300 bg-clip-text text-transparent font-semibold">
                    Vision partagée
                  </span>
                </p>
              </div>
            }
            buttonContent={
              /* 🪄 STYLE GLASSMORPHISME GRIS CLAIR -> NOIR PURE */
              <div className="px-6 py-2 rounded-lg bg-gradient-to-br from-gray-300/40 via-gray-600/20 to-black border border-white/20 shadow-2xl backdrop-blur-md transition-transform hover:scale-105 flex items-center justify-center">
                <span className="text-sm font-black uppercase tracking-widest bg-gradient-to-b from-gray-100 to-black/80 bg-clip-text text-transparent">
                  Comprendre
                </span>
              </div>
            }
            modalContent={
              <div className="flex flex-col gap-2 text-white/90 text-sm">
                <p>
                  La donnée est le premier moteur de croissance du XXIᵉ siècle.
                  Un État qui investit dans la donnée gagne en souveraineté et
                  attire les investissements.
                </p>
                <p>
                  La data permet d'optimiser les décisions et de réduire
                  massivement les coûts structurels.
                </p>
              </div>
            }
          />
        </aside>

        {/* SideCard */}
        <aside className="relative z-10 md:absolute md:right-3 md:mr-6 lg:mr-8 flex justify-center md:justify-end w-full md:w-auto min-w-[300px]">
          <SideCard
            imageSrc="/zyy.png"
            title="Zy recherche un financement orienté workspace & Workflow"
            description="Exécution de la logique métier et serveur en burn out."
            location="Anyama, Abidjan, Côte d'Ivoire"
          />
        </aside>
      </main>
    </>
  );
}
