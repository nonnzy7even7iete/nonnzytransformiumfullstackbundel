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
      {/* Glow background effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl top-[-10%] left-[-10%]" />
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/30 rounded-full blur-3xl bottom-[-10%] right-[-10%]" />
      </div>

      <div className="p-10 bg-zinc-900/70 backdrop-blur-xl rounded-2xl text-center border border-white/10 shadow-2xl shadow-purple-500/20 hover:shadow-cyan-500/20 transition-shadow duration-500">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 drop-shadow-md mb-6 animate-pulse">
          Bienvenue
        </h1>
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-600/40 hover:scale-105 hover:shadow-cyan-500/40 transition-transform duration-300 ease-out"
        >
          <FcGoogle className="text-2xl" /> Continuer avec Google
        </button>
      </div>
    </main>
  );
}
