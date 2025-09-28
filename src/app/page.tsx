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
      {/* Glassmorphic card */}
      <div className="w-[277px] h-[277px] p-[7px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[17%] flex flex-col items-center justify-center shadow-lg">
        {/* Titre */}
        <h1 className="text-xl text-white mb-4 text-center font-semibold drop-shadow-lg">
          Bienvenue
        </h1>

        {/* Bouton Google */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-[90%] py-2 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:shadow-cyan-500/50 transition-transform duration-300 ease-out"
        >
          <FcGoogle className="text-2xl" /> Continuer avec Google
        </button>
      </div>

      {/* Effets lumineux de fond */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl top-[-10%] left-[-10%]" />
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/30 rounded-full blur-3xl bottom-[-10%] right-[-10%]" />
      </div>
    </main>
  );
}
