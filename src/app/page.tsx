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
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Navbar avec z-index élevé pour rester au-dessus du ripple */}
      <div className="relative z-50">
        <Navbar />
      </div>

      <main
        className="relative flex flex-col md:flex-row items-center justify-center 
  min-h-screen bg-gradient-to-br from-zinc-700 via-black to-zinc-900 
  overflow-hidden px-4 md:px-8 pb-10 gap-6 md:gap-0 pt-32 md:pt-40"
      >
        {/* Fond dynamique */}
        <div className="absolute inset-0 z-0">
          <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />
        </div>

        {/* --- CARTE GAUCHE (DataCard) --- */}
        <aside
          className="relative z-20 md:absolute md:left-6 lg:left-10 
          w-full md:w-auto flex justify-center order-2 md:order-1"
        >
          <DataCard
            width={320}
            height={280}
            title={
              <div className="flex items-center gap-2 text-white">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-xs leading-tight">
                  Data-driven growth : Anyama
                </span>
              </div>
            }
            content={
              <div className="text-white/80 text-xs space-y-2">
                <p>Le potentiel se mesure dans ce qui reste à révéler.</p>
                <p className="bg-gradient-to-r from-green-500 to-blue-300 bg-clip-text text-transparent font-bold">
                  Vision partagée
                </p>
              </div>
            }
            // ... autres props inchangées
          />
        </aside>

        {/* --- BLOC CENTRAL (Connexion) --- */}
        <div
          className="relative z-30 flex flex-col items-center justify-center 
          w-full md:w-[480px] order-1 md:order-2"
        >
          <div
            className="w-full p-8 md:p-10 bg-black/40 backdrop-blur-2xl border border-white/10 
            rounded-3xl shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]"
          >
            {/* Conteneur du texte pour gérer l'espace sans toucher aux réglages internes */}
            <div className="mb-[-50px] md:mb-[-80px] overflow-visible">
              <TextHoverEffect
                text="Nonnzytr"
                duration={0.6}
                style={{
                  width: "100%",
                  height: "250px", // Réduit légèrement pour éviter de pousser tout vers le bas
                  fontSize: "clamp(5rem, 15vw, 12rem)", // Ajustement de la taille de police responsive
                }}
              />
            </div>

            <p className="text-white/70 text-base mb-8 text-center">
              Votre aventure commence ici ✨
            </p>

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full py-4 flex items-center justify-center gap-3 
              bg-white text-black font-bold rounded-2xl shadow-lg
              hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] 
              transition-all duration-200 mb-6"
            >
              <FcGoogle className="text-2xl" />
              Continuer avec Google
            </button>

            <p className="text-white/40 text-[10px] text-center uppercase tracking-widest">
              Sécurisé par Google Cloud
            </p>
          </div>
        </div>

        {/* --- CARTE DROITE (SideCard) --- */}
        <aside
          className="relative z-20 md:absolute md:right-6 lg:right-10 
          w-full md:w-auto flex justify-center order-3"
        >
          <SideCard
            imageSrc="/zyy.png"
            title="Zy Funding"
            description="Exécution de la logique métier et serveur."
            location="Anyama, Abidjan"
          />
        </aside>
      </main>
    </div>
  );
}
