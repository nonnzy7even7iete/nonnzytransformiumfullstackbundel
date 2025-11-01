"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Loader from "@/components/Loader";
import { BackgroundRippleEffect } from "@/components/ui/BackgroundRippleEffect";
import { TextHoverEffect } from "@/components/ui/TextHoverEffect";
import SideCard from "@/components/SideCard";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  if (status === "loading" || status === "authenticated") return <Loader />;

  return (
    <main className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-zinc-700 via-black to-zinc-900 overflow-hidden px-6 py-10 gap-8">
      {/* Fond dynamique */}
      <div className="absolute inset-0 z-0">
        <BackgroundRippleEffect rows={8} cols={20} cellSize={50} />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full md:w-[450px] mt-10 md:mt-0">
        {/* Texte animé */}
        <div className="w-full flex justify-center mb-6">
          <TextHoverEffect
            text="Nonnzytransformium"
            duration={0.6}
            style={{
              height: "clamp(80px, 12vw, 160px)",
              width: "95%",
              maxWidth: "800px",
            }}
          />
        </div>

        {/* Card centrale */}
        <div className="w-full p-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          <h1
            className="font-extrabold bg-gradient-to-r from-green-700 to-blue-400 bg-clip-text text-transparent mb-4 drop-shadow-lg leading-tight text-center"
            style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
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

      {/* SideCard responsive */}
      <aside className="relative z-10 w-full md:w-[320px] flex justify-center md:justify-end">
        <SideCard
          imageSrc="/images/sample1.jpg"
          title="Explorez votre univers"
          description="Découvrez les secrets du workflow Nonnzytransformium."
        />
      </aside>
    </main>
  );
}
