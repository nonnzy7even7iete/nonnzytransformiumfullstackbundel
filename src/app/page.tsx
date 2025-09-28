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
    <main className="flex items-center justify-center min-h-screen bg-zinc-900">
      {/* Glassmorphic card dark */}
      <div className="w-[277px] h-[277px] p-[7px] bg-black/40 backdrop-blur-xl border border-white/20 rounded-[17%] flex flex-col items-center justify-between shadow-lg">
        {/* H1 titre */}
        <h1 className="text-xl text-white font-bold text-center mt-2">
          Nonnzytrasformium
        </h1>

        {/* Bouton Google */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-[90%] py-2 flex items-center justify-center gap-2 bg-gradient-to-r from-black to-green-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ease-out"
        >
          <FcGoogle className="text-2xl" />
          Nonnzytrasformium - C’est avec votre compte Google
        </button>

        {/* Texte complet hors du bouton */}
        <p className="text-white/60 text-xs text-center mb-2 font-thin px-2">
          Le seul moyen de continuer l'aventure avec nous est avec un compte
          Google / Continuer avec votre compte Google
        </p>
      </div>
    </main>
  );
}
