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
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  if (status === "loading" || status === "authenticated") return <Loader />;

  return (
    <>
      <Navbar />

      <main className="relative flex flex-col md:flex-row items-center justify-center min-h-screen overflow-hidden px-4 md:px-8 pb-24 pt-32 md:pt-40 bg-app-gradient">
        <div className="absolute inset-0 z-0 select-none">
          <MasterAuroraBackground />
        </div>

        {/* CONTENU CENTRAL */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full md:w-[460px] max-w-[90vw]">
          <div className="w-full p-10 backdrop-blur-2xl rounded-3xl shadow-2xl bg-white/5 border border-white/10">
            <TextHoverEffect
              text="Nonnzytr"
              duration={0.6}
              style={{
                width: "min(100%, 1000px)",
                height: "min(20vw, 400px)",
                fontSize: "clamp(28rem, 28vw, 68rem)",
              }}
            />
            <p className="text-zinc-500 dark:text-zinc-400 font-extralight tracking-[0.1em] text-sm mb-8 uppercase">
              Votre aventure commence ici
            </p>
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full py-4 flex items-center justify-center gap-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-light rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <FcGoogle className="text-xl" />
              Continuer avec Google
            </button>
          </div>
        </div>

        {/* ASIDES (TEXTES LONGS INTACTS) */}
        <aside className="relative z-11 md:absolute md:left-8 flex justify-center w-full md:w-auto">
          <DataCard
            width={300}
            height={270}
            title={
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="font-light">Data-driven growth</span>
              </div>
            }
            content={
              <div className="font-extralight text-sm opacity-80 leading-relaxed">
                <p>
                  Les métriques d'attractivité et les flux d'investissement
                  convergent vers une réalité : le vrai potentiel se mesure dans
                  ce qui reste à révéler...
                </p>
              </div>
            }
            buttonContent={
              <div className="font-extralight uppercase tracking-widest text-xs">
                Comprendre
              </div>
            }
            modalContent={
              <div className="font-extralight leading-relaxed">
                <p>
                  La donnée réduit les coûts structurels de l'État (et ce de
                  façon massive)...
                </p>
              </div>
            }
          />
        </aside>

        <aside className="relative z-10 md:absolute md:right-8 flex justify-center w-full md:w-auto">
          <SideCard
            imageSrc="/zyy.png"
            title="Zy recherche un financement"
            description="Exécution de la logique métier et serveur en burn out."
            location="Anyama, Abidjan"
          />
        </aside>

        {/* DOCK GLASSMORPHISM ÉPURÉ */}
        <div className="fixed bottom-8 left-0 right-0 z-[100] flex justify-center pointer-events-none px-6">
          <div className="pointer-events-auto">
            <Dock
              items={[
                { icon: Home, href: "/", label: "Home" },
                { icon: Github, href: "https://github.com", label: "Github" },
                { icon: Linkedin, href: "https://linkedin.com", label: "Link" },
              ]}
            />
          </div>
        </div>
      </main>
    </>
  );
}
