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
import Navbar from "@/components/NavbarFront"; // ← import de la navbar

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  if (status === "loading" || status === "authenticated") return <Loader />;

  return (
    <>
      {/* Navbar fixée */}
      <Navbar />

      <main
        className="relative flex flex-col md:flex-row items-center justify-center 
  min-h-screen overflow-hidden px-4 md:px-8 pb-10 gap-6 md:gap-0 pt-32 md:pt-40
  bg-gradient-to-br from-slate-100 via-white to-slate-200 
  dark:from-zinc-700 dark:via-black dark:to-zinc-900"
      >
        {/* Fond dynamique */}
        <div className="absolute inset-0 z-0">
          <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />
        </div>

        {/* Bloc principal centré */}
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center 
w-full md:w-[460px] max-w-[90vw] min-w-[300px]"
        >
          {/* Bloc de connexion */}
          <div
            className="w-full p-10 backdrop-blur-xl border rounded-2xl shadow-2xl min-w-[300px]
            bg-white/60 border-black/5 dark:bg-black/40 dark:border-white/10"
          >
            {/* Titre remplacé par TextHoverEffect agrandi */}
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

            <p className="text-zinc-600 dark:text-white/70 text-base mb-8">
              Votre aventure commence ici ✨
            </p>

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full py-3 flex items-center justify-center gap-2 
bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold rounded-xl shadow-md
hover:shadow-xl hover:scale-105 active:scale-95 
transition-all duration-300 mb-6"
            >
              <FcGoogle className="text-2xl" />
              Continuer avec Google
            </button>

            <p className="text-zinc-500 dark:text-white/50 text-xs italic">
              Connexion sécurisée via Google requise pour accéder au Workflow.
            </p>
          </div>
        </div>

        {/* DataCard flottante à gauche */}
        <aside
          className="relative z-11 md:absolute md:left-3 md:ml-6 lg:ml-8 
flex justify-center md:justify-start w-full md:w-auto min-w-[300px]"
        >
          <DataCard
            width={300}
            height={270}
            title={
              <div className="flex items-center justify-center gap-2 text-zinc-900 dark:text-white">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold">
                  Data-driven growth : chaque flux, chaque métrique confirme le
                  potentiel d'Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col gap-1 text-zinc-700 dark:text-white text-sm overflow-auto max-h-[200px] md:max-h-[250px]">
                <p>
                  Les métriques d'attractivité et les flux d'investissement
                  convergent vers une réalité : le vrai potentiel se mesure dans
                  ce qui reste à révéler. Anyama dispose d'un avantage
                  stratégique encore invisible à la majorité des acteurs. La
                  data ne ment pas — la question, c'est qui l'exploitera en
                  premier. :{" "}
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-300 bg-clip-text text-transparent font-semibold">
                    Vision partager
                  </span>
                </p>
                <p>
                  Les chiffres sont là. Les investisseurs arrivent. La question,
                  c'est : serez-vous prêts ?
                </p>
                <p>
                  Votre commune entre dans une zone d'attractivité stratégique:
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-300 bg-clip-text text-transparent font-semibold">
                    Sans insights, chaque décision est un pari perdu d'avance.
                  </span>
                </p>
              </div>
            }
            buttonContent={
              <span className="text-sm font-medium text-zinc-900 dark:text-black">
                Comprendre
              </span>
            }
            modalContent={
              <div className="flex flex-col gap-2 text-zinc-800 dark:text-white text-sm overflow-auto max-h-[400px] md:max-h-[450px]">
                <p>
                  Potentiel latent détecté : chaque flux, chaque indicateur
                  montre que votre territoire est sous-évalué.
                </p>
                <p>
                  La donnée est le premier moteur de croissance du XXIᵉ
                  siècle...
                  {/* ... reste du texte identique ... */}
                </p>
              </div>
            }
          />
        </aside>

        {/* SideCard collée à droite */}
        <aside
          className="relative z-10 md:absolute md:right-3 md:mr-6 lg:mr-8 
flex justify-center md:justify-end w-full md:w-auto min-w-[300px]"
        >
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
