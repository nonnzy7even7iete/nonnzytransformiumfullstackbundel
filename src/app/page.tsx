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

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  if (status === "loading" || status === "authenticated") return <Loader />;

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-zinc-700 via-black to-zinc-900 overflow-hidden px-4 md:px-8 py-10 gap-10">
      {/* Fond dynamique */}
      <div className="absolute inset-0 z-0">
        <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />
      </div>

      {/* Bloc principal centré */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full md:w-[460px] max-w-[90vw] mt-8 md:mt-0 transition-all duration-500">
        <div className="w-full flex justify-center mb-6">
          <TextHoverEffect
            text="Nonnzytransformium"
            duration={0.6}
            style={{
              height: "clamp(200px, 20vw, 300px)",
              width: "clamp(280px, 90vw, 1200px)",
              fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
            }}
          />
        </div>

        <div className="w-full p-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          <h1
            className="font-extrabold bg-gradient-to-r from-green-700 to-blue-400 bg-clip-text text-transparent mb-4 drop-shadow-lg leading-tight text-center"
            style={{ fontSize: "clamp(2.5rem, 7vw, 4rem)" }}
          >
            Nonnzytr
          </h1>

          <p className="text-white/70 text-base mb-8">
            Votre aventure commence ici ✨
          </p>

          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full py-3 flex items-center justify-center gap-2 
            bg-white text-black font-semibold rounded-xl shadow-md
            hover:shadow-xl hover:scale-105 active:scale-95 
            transition-all duration-300"
          >
            <FcGoogle className="text-2xl" />
            Continuer avec Google
          </button>

          <p className="text-white/50 text-xs mt-6 italic">
            Connexion sécurisée via Google requise pour accéder au Workflow.
          </p>
        </div>
      </div>

      {/* DataCard */}
      <aside className="relative z-10 flex justify-center w-full md:w-auto transition-all duration-500 md:absolute md:left-3 md:ml-6 lg:ml-8">
        <div className="min-w-[90vw] max-w-full md:w-[270px] transition-all duration-500">
          <DataCard
            width={270}
            height={270}
            title={
              <div className="flex items-center justify-center gap-2 text-white">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="font-semibold">
                  Data-driven growth : chaque flux, chaque métrique confirme le
                  potentiel d'Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col gap-1 text-white text-sm overflow-auto max-h-[200px] md:max-h-[250px]">
                <p>
                  Les métriques d’attractivité et les flux d’investissement
                  convergent vers une réalité : le vrai potentiel se mesure dans
                  ce qui reste à révéler. Anyama dispose d’un avantage
                  stratégique encore invisible à la majorité des acteurs. La
                  data ne ment pas — la question, c’est qui l’exploitera en
                  premier. :{" "}
                  <span className="text-blue-300">Vision partagée</span>
                </p>
                <p>
                  Les chiffres sont là. Les investisseurs arrivent. La question,
                  c’est : serez-vous prêts ?
                </p>
                <p>
                  Votre commune entre dans une zone d’attractivité stratégique.
                </p>
              </div>
            }
            buttonContent={
              <span className="text-sm font-medium text-black">Comprendre</span>
            }
          />
        </div>
      </aside>

      {/* SideCard */}
      <aside className="relative z-10 flex justify-center w-full md:w-auto transition-all duration-500 md:absolute md:right-3 md:mr-6 lg:mr-8">
        <div className="min-w-[90vw] max-w-full md:w-[270px] transition-all duration-500">
          <SideCard
            imageSrc="/zyy.png"
            title="Zy recherche un financement orienté workspace & Workflow"
            description="Exécution de la logique métier et serveur en burn out."
            location="Anyama, Abidjan, Côte d'Ivoire"
          />
        </div>
      </aside>
    </main>
  );
}
