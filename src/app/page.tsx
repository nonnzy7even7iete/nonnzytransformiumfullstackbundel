"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Info } from "lucide-react";
import dynamic from "next/dynamic";

// Imports standards
import Loader from "@/components/frontendkit/Loader";
import Navbar from "@/components/frontendkit/NavbarFront";
import SideCard from "@/components/frontendkit/SideCard";
import DataCard from "@/components/frontendkit/DataCard";

// Chargement dynamique des composants lourds/complexes pour éviter les erreurs SSR
const MasterAuroraBackground = dynamic(
  () =>
    import("@/components/ui/MasterAuroraBackground").then(
      (mod) => mod.MasterAuroraBackground
    ),
  { ssr: false }
);

const TextHoverEffect = dynamic(
  () =>
    import("@/components/ui/TextHoverEffect").then(
      (mod) => mod.TextHoverEffect
    ),
  { ssr: false }
);

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Sécurité d'hydratation
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  // Si le composant n'est pas monté ou que la session charge, on affiche le loader
  if (!mounted || status === "loading" || status === "authenticated") {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <main className="relative flex flex-col md:flex-row items-center justify-center min-h-screen overflow-hidden px-4 md:px-8 pb-10 gap-6 md:gap-0 pt-32 md:pt-40 bg-app-gradient">
        {/* Fond Aurora isolé du rendu serveur */}
        <div className="absolute inset-0 z-0">
          <MasterAuroraBackground />
        </div>

        {/* CONTENU CENTRAL */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full md:w-[460px] max-w-[90vw] min-w-[300px]">
          <div className="w-full p-10 backdrop-blur-xl rounded-2xl shadow-2xl bg-glass-dual border border-border-dual">
            <div className="flex items-center justify-center mb-4 min-h-[300px]">
              <TextHoverEffect
                text="Nonnzytr"
                duration={0.6}
                // Simplification des styles pour éviter les calculs de layout complexes
                style={{
                  width: "100%",
                  height: "300px",
                }}
              />
            </div>

            <p className="text-foreground text-base mb-8">
              Votre aventure commence ici
            </p>

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full py-3 flex items-center justify-center gap-2 
              bg-foreground text-background font-semibold rounded-xl shadow-md
              hover:shadow-xl hover:scale-105 active:scale-95 
              transition-all duration-300 mb-6"
            >
              <FcGoogle className="text-2xl" />
              Continuer avec Google
            </button>

            <p className="text-foreground/50 text-xs italic">
              Connexion sécurisée via Google requise.
            </p>
          </div>
        </div>

        {/* ASIDE GAUCHE (DataCard) */}
        <aside className="relative z-20 md:absolute md:left-3 md:ml-6 lg:ml-8 flex justify-center md:justify-start w-full md:w-auto">
          <DataCard
            width={300}
            height={270}
            title={
              <div className="flex items-center gap-2 text-foreground">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-xs text-left">
                  Data-driven growth potentiel d'Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col gap-1 text-foreground/80 text-sm overflow-y-auto max-h-[150px]">
                <p>
                  Les métriques d'attractivité confirment le potentiel
                  stratégique d'Anyama.
                </p>
                <p className="text-emerald-500 font-semibold">
                  Vision partagée
                </p>
              </div>
            }
            buttonContent={
              <div className="w-full py-2 flex items-center justify-center bg-foreground/5 border border-border rounded-xl">
                <span className="text-xs font-bold uppercase tracking-tighter">
                  Comprendre
                </span>
              </div>
            }
            modalContent={
              <div className="p-4 text-foreground/90">
                <p>
                  Potentiel latent détecté : votre territoire est sous-évalué.
                </p>
              </div>
            }
          />
        </aside>

        {/* ASIDE DROIT (SideCard) */}
        <aside className="relative z-20 md:absolute md:right-3 md:mr-6 lg:mr-8 flex justify-center md:justify-end w-full md:w-auto">
          <SideCard
            imageSrc="/zyy.png"
            title="Zy recherche un financement"
            description="Exécution de la logique métier et serveur."
            location="Anyama, Abidjan"
          />
        </aside>
      </main>
    </>
  );
}
