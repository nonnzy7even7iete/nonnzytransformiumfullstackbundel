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
        bg-app-gradient" /* 🪄 Utilise le dégradé dual (Gris -> Blanc / Zinc -> Noir) */
      >
        {/* Fond dynamique */}
        <div className="absolute inset-0 z-0">
          <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />
        </div>

        {/* Bloc principal centré */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full md:w-[460px] max-w-[90vw] min-w-[300px]">
          {/* Bloc de connexion (Glassmorphism) */}
          <div
            className="w-full p-10 backdrop-blur-xl rounded-2xl shadow-2xl min-w-[300px]
            bg-glass-dual border border-border-dual" /* 🪄 Switch auto : Noir/40% ou Blanc/60% */
          >
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

            <p className="text-foreground/70 text-base mb-8">
              {" "}
              {/* 🪄 text-white/70 devient adaptatif */}
              Votre aventure commence ici ✨
            </p>

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full py-3 flex items-center justify-center gap-2 
              bg-foreground text-background font-semibold rounded-xl shadow-md
              hover:shadow-xl hover:scale-105 active:scale-95 
              transition-all duration-300 mb-6" /* 🪄 S'inverse seul : Fond Blanc/Texte Noir en Dark */
            >
              <FcGoogle className="text-2xl" />
              Continuer avec Google
            </button>

            <p className="text-foreground/50 text-xs italic">
              Connexion sécurisée via Google requise pour accéder au Workflow.
            </p>
          </div>
        </div>

        {/* DataCard flottante à gauche */}
        <aside className="relative z-11 md:absolute md:left-3 md:ml-6 lg:ml-8 flex justify-center md:justify-start w-full md:w-auto min-w-[300px]">
          <DataCard
            width={300}
            height={270}
            title={
              <div className="flex items-center justify-center gap-2 text-foreground">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="font-semibold">Data-driven growth</span>
              </div>
            }
            content={
              <div className="flex flex-col gap-1 text-foreground/80 text-sm overflow-auto max-h-[200px] md:max-h-[250px]">
                {/* Contenu textuel adaptatif... */}
                <p>
                  Les métriques d'attractivité... Anyama dispose d'un avantage
                  stratégique.
                </p>
              </div>
            }
            buttonContent={
              <span className="text-sm font-medium text-background">
                Comprendre
              </span>
            }
          />
        </aside>

        {/* SideCard collée à droite */}
        <aside className="relative z-10 md:absolute md:right-3 md:mr-6 lg:mr-8 flex justify-center md:justify-end w-full md:w-auto min-w-[300px]">
          <SideCard
            imageSrc="/zyy.png"
            title="Zy recherche un financement"
            description="Exécution de la logique métier et serveur en burn out."
            location="Anyama, Abidjan, Côte d'Ivoire"
          />
        </aside>
      </main>
    </>
  );
}
