"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Loader from "@/components/Loader";
import { BackgroundRippleEffect } from "@/components/ui/BackgroundRippleEffect";
import { TextHoverEffect } from "@/components/ui/TextHoverEffect";
import SideCard from "@/components/SideCard"; // import de ton SideCard

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  if (status === "loading" || status === "authenticated") return <Loader />;

  return (
    <main className="relative flex flex-row justify-center items-start min-h-screen bg-gradient-to-br from-zinc-700 via-black to-zinc-900 overflow-visible gap-8 p-6">
      {/* Contenu principal */}
      <div className="flex flex-col items-center justify-center flex-1">
        {/* Fond dynamique */}
        <BackgroundRippleEffect rows={8} cols={20} cellSize={50} />

        {/* Texte animé flottant au-dessus */}
        <div className="absolute top-[10px] sm:top-[20px] w-full flex justify-center z-20 overflow-visible">
          <TextHoverEffect
            text="Nonnzytrans"
            duration={0.6}
            style={{
              height: "160px",
              width: "95%",
              maxWidth: "1200px",
            }}
          />
        </div>

        {/* Card centrale */}
        <div className="relative z-10 w-[360px] sm:w-[450px] p-14 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl text-center mt-40 overflow-visible">
          {/* Titre responsive */}
          <h1
            className="font-extrabold bg-gradient-to-r from-green-700 to-blue-400 bg-clip-text text-transparent mb-3 drop-shadow-lg leading-tight overflow-visible max-w-full text-center"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            Nonnzytrans
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

      {/* SideCard unique */}
      <aside className="flex flex-col gap-4 mt-40">
        <SideCard
          imageSrc="/images/sample1.jpg"
          title="Titre SideCard"
          description="Description concise pour cette card."
        />
      </aside>
    </main>
  );
}
