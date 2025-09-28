"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
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
      {/* Glassmorphic card dark */}
      <div className="w-[277px] h-[277px] p-[7px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-[17%] flex flex-col items-center justify-between shadow-lg">
        {/* H1 titre */}
        <h1 className="text-xl text-white font-bold text-center drop-shadow-lg mt-2">
          Nonnzytrasformium
        </h1>

        {/* Bouton avec message */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-[90%] py-2 flex items-center justify-center text-center text-white font-semibold rounded-lg bg-gradient-to-r from-black to-green-500 shadow-md hover:scale-105 transition-transform duration-300 ease-out"
        >
          Le seul moyen de continuer l'aventure avec nous est avec un compte
          Google / Continuer avec votre compte Google
        </button>

        {/* Texte philosophique en bas */}
        <p className="text-white/60 text-xs text-center mb-2 font-thin">
          La vie avance, qui recule ?
        </p>
      </div>

      {/* Effets lumineux de fond */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl top-[-10%] left-[-10%]" />
        <div className="absolute w-[400px] h-[400px] bg-green-500/20 rounded-full blur-3xl bottom-[-10%] right-[-10%]" />
      </div>
    </main>
  );
}
