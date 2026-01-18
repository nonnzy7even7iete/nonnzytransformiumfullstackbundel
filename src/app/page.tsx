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

        <div
          className="relative z-10 flex flex-col items-center justify-center text-center 
w-full md:w-[460px] max-w-[90vw] min-w-[300px]"
        >
          <div
            className="w-full p-10 backdrop-blur-xl rounded-2xl shadow-2xl min-w-[300px]
            bg-glass-dual border border-border-dual"
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

            {/* Texte forcé en NOIR pour le bloc de connexion */}
            <p className="text-black text-base mb-8">
              Votre aventure commence ici âœ¨
            </p>

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full py-3 flex items-center justify-center gap-2 
bg-white text-black font-semibold rounded-xl shadow-md
hover:shadow-xl hover:scale-105 active:scale-95 
transition-all duration-300 mb-6"
            >
              <FcGoogle className="text-2xl" />
              Continuer avec Google
            </button>

            {/* Texte forcé en NOIR pour le bloc de connexion */}
            <p className="text-black/50 text-xs italic">
              Connexion sÃ©curisÃ©e via Google requise pour accÃ©der au
              Workflow.
            </p>
          </div>
        </div>

        <aside
          className="relative z-11 md:absolute md:left-3 md:ml-6 lg:ml-8 
flex justify-center md:justify-start w-full md:w-auto min-w-[300px]"
        >
          <DataCard
            width={300}
            height={270}
            title={
              <div className="flex items-center justify-center gap-2 text-foreground">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="font-semibold">
                  Data-driven growth : chaque flux, chaque mÃ©trique confirme le
                  potentiel d'Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col gap-1 text-foreground/80 text-sm overflow-auto max-h-[200px] md:max-h-[250px]">
                <p>
                  Les mÃ©triques d'attractivitÃ© et les flux d'investissement
                  convergent vers une rÃ©alitÃ© : le vrai potentiel se mesure
                  dans ce qui reste Ã  rÃ©vÃ©ler. Anyama dispose d'un avantage
                  stratÃ©gique encore invisible Ã  la majoritÃ© des acteurs. La
                  data ne ment pas â€” la question, c'est qui l'exploitera en
                  premier. :{" "}
                  <span className="bg-gradient-to-r from-green-500 to-blue-300 bg-clip-text text-transparent font-semibold">
                    Vision partager
                  </span>
                </p>
                <p>
                  Les chiffres sont lÃ . Les investisseurs arrivent. La
                  question, c'est : serez-vous prÃªts ?
                </p>
                <p>
                  Votre commune entre dans une zone d'attractivitÃ©
                  stratÃ©gique:
                  <span className="bg-gradient-to-r from-green-500 to-blue-300 bg-clip-text text-transparent font-semibold">
                    Sans insights, chaque dÃ©cision est un pari perdu d'avance.
                  </span>
                </p>
              </div>
            }
            buttonContent={
              /* Style manuel pour le bouton Comprendre : Gradient Verre vers Noir Pur */
              <div className="px-6 py-2 rounded-lg bg-gradient-to-br from-white/10 to-[#000000] border border-white/10 shadow-xl transition-transform hover:scale-105 flex items-center justify-center">
                <span className="text-sm font-bold bg-gradient-to-br from-white/80 to-[#000000] bg-clip-text text-transparent">
                  Comprendre
                </span>
              </div>
            }
            modalContent={
              <div className="flex flex-col gap-2 text-foreground/90 text-sm overflow-auto max-h-[400px] md:max-h-[450px]">
                <p>
                  Potentiel latent dÃ©tectÃ© : chaque flux, chaque indicateur
                  montre que votre territoire est sous-Ã©valuÃ©.
                </p>
                <p>
                  La donnÃ©e est le premier moteur de croissance du XXIáµ‰
                  siÃ¨cle Les Ã©conomies modernes sont tirÃ©es par : la
                  prÃ©cision des dÃ©cisions, la rapiditÃ© d'exÃ©cution, la
                  capacitÃ© Ã  anticiper les crises plutÃ´t que les subir. Or,
                  tout cela dÃ©pend de la donnÃ©e. Un Ã‰tat qui n'investit pas
                  dans la data : avance Ã  vue, perd du temps, gaspille des
                  ressources, devient dÃ©pendant d'acteurs privÃ©s mieux
                  structurÃ©s. Un Ã‰tat qui investit dans la data : gagne en
                  souverainetÃ©, augmente sa productivitÃ© globale, attire
                  davantage d'investissements, devient un moteur d'innovation.
                </p>
                <p>
                  La donnÃ©e rÃ©duit les coÃ»ts structurels de l'Ã‰tat (et ce de
                  faÃ§on massive) Les administrations gÃ¨rent des millions de
                  microdÃ©cisions quotidiennes. Sans data : DÃ©cisions
                  approximatives â†’ dÃ©penses imprÃ©cises â†’ surcoÃ»ts â†’
                  inefficacitÃ©s â†’ retards â†’ litiges. Avec la data :
                  DÃ©cisions optimisÃ©es â†’ rÃ©duction des gaspillages â†’
                  maÃ®trise des dÃ©penses publiques â†’ accÃ©lÃ©ration des
                  services. On parle de milliards potentiels Ã©conomisÃ©s sur :
                  la logistique l'Ã©nergie les achats publics les fraudes et
                  erreurs les allocations la maintenance des infrastructures
                  Investir dans la data, ce n'est pas une dÃ©pense : c'est un
                  amortisseur de dÃ©penses futures.
                </p>
              </div>
            }
          />
        </aside>

        <aside
          className="relative z-10 md:absolute md:right-3 md:mr-6 lg:mr-8 
flex justify-center md:justify-end w-full md:w-auto min-w-[300px]"
        >
          <SideCard
            imageSrc="/zyy.png"
            title="Zy recherche un financement orientÃ© workspace & Workflow"
            description="ExÃ©cution de la logique mÃ©tier et serveur en burn out."
            location="Anyama, Abidjan, CÃ´te d'Ivoire"
          />
        </aside>
      </main>
    </>
  );
}
