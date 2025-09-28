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
      {/* Card container */}
      <div className="w-[277px] h-[277px] p-[7px] bg-black/50 backdrop-blur-md border border-white/20 rounded-[7px] relative flex flex-col justify-center items-center shadow-lg">
        {/* Titre qui dépasse */}
        <h1 className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white font-bold text-xl drop-shadow-sm">
          Nonnzytrasformium
        </h1>

        {/* Bouton Google */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-[90%] py-2 flex items-center justify-center gap-2 bg-gradient-to-r from-black to-green-500 text-white font-medium rounded-[7px] shadow-md hover:scale-105 hover:shadow-green-400/50 transition-all duration-300 mt-16"
        >
          <FcGoogle className="text-2xl" />
          Continuer avec Google
        </button>

        {/* Texte explicatif centré en bas */}
        <p className="text-white/60 text-xs text-center font-thin mt-4 px-2">
          Le seul moyen de continuer l'aventure avec nous est avec un compte
          Google / Continuer avec votre compte Google
        </p>
      </div>
    </main>
  );
}
