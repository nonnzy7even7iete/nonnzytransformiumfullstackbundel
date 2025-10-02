"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Loader from "@/components/Loader";
import { BackgroundRippleEffect } from "@/components/ui/BackgroundRippleEffect";
import { TextHoverEffect } from "@/components/ui/TextHoverEffect";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  if (status === "loading" || status === "authenticated") return <Loader />;

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-zinc-700 via-black to-zinc-900 overflow-hidden">
      {/* Fond interactif */}
      <BackgroundRippleEffect rows={8} cols={20} cellSize={50} />

      {/* Texte animé impactant proche du top */}
      <div className="absolute top-[7px] sm:top-[15px] w-full flex justify-center z-20">
        <TextHoverEffect
          text="Soyez informé de toutes les transactions"
          duration={0.5}
          style={{
            height: "70px", // plus visible
            width: "90%",
            maxWidth: "600px",
          }}
        />
      </div>

      {/* Card centrale */}
      <div className="relative z-10 w-[340px] p-14 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl text-center mt-32">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-700 to-blue-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">
          Nonnzytrasformium
        </h1>
        <p className="text-white/70 text-sm mb-8">
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
    </main>
  );
}
