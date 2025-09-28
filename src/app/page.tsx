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
      {/* Card glassmorphique */}
      <div className="w-[277px] h-[277px] p-[7px] bg-black/50 backdrop-blur-md border border-white/20 rounded-[15%] flex flex-col justify-between shadow-lg">
        {/* H1 titre */}
        <h1 className="text-xl text-white font-semibold text-center mt-2 drop-shadow-sm">
          Nonnzytrasformium
        </h1>

        {/* Bouton Google */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-[90%] py-2 flex items-center justify-center gap-2 bg-gradient-to-r from-black to-green-500 text-white font-medium rounded-lg shadow-md hover:scale-105 hover:shadow-green-400/50 transition-all duration-300"
        >
          <FcGoogle className="text-2xl" />
          Nonnzytrasformium - C’est avec votre compte Google
        </button>

        {/* Texte explicatif en bas */}
        <p className="text-white/60 text-xs text-center font-thin mb-2 px-2">
          Le seul moyen de continuer l'aventure avec nous est avec un compte
          Google / Continuer avec votre compte Google
        </p>
      </div>
    </main>
  );
}
