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

      {/* Card principale */}
      <div className="w-[277px] h-[277px] p-[7px] bg-black/50 backdrop-blur-md border border-white/20 rounded-[7px] relative flex flex-col justify-center items-center shadow-lg">

        {/* Titre dans sa mini-card glassmorphique */}
        <div className="absolute -top-6 bg-black/50 backdrop-blur-md border border-white/20 rounded-[7px] px-[7px] py-[7px]">
          <h1 className="text-transparent font-bold text-xl bg-clip-text bg-gradient-to-r from-gray-300 to-gray-300 drop-shadow-sm text-center">
            Nonnzytrasformium
          </h1>
        </div>

        {/* Bouton Google centré verticalement */}
        <div className="flex-1 flex items-center justify-center w-full">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-[90%] py-2 flex items-center justify-center gap-2 bg-white text-black font-medium rounded-[7px] shadow-md hover:scale-105 transition-all duration-300"
          >
            <FcGoogle className="text-2xl" />
            Continuer avec Google
          </button>
        </div>

        {/* Texte explicatif collé en bas */}
        <p className="text-white/60 text-xs text-center font-thin absolute bottom-[2px] px-2 w-full">
          Le seul moyen de continuer l'aventure avec nous est avec un compte Google / Continuer avec votre compte Google
        </p>
      </div>

    </main>
  );
}
