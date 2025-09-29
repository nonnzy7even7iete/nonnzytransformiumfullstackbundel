"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Loader from "@/components/Loader";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  if (status === "loading" || status === "authenticated") return <Loader />;

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 relative overflow-hidden">
      {/* Halo lumineux animé */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>

      {/* Card centrale */}
      <div className="relative w-[340px] p-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl text-center">
        {/* Logo / titre */}
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">
          Nonnzytrasformium
        </h1>
        <p className="text-white/70 text-sm mb-8">
          Votre aventure commence ici ✨
        </p>

        {/* Bouton Google */}
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

        {/* Texte secondaire */}
        <p className="text-white/50 text-xs mt-6 italic">
          Connexion sécurisée via Google requise pour accéder à l’application.
        </p>
      </div>
    </main>
  );
}
