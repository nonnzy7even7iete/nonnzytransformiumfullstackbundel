"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") return <p className="text-white">Chargement...</p>;
  if (!session) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="w-full max-w-md p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Paramètres</h1>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-white/10 bg-white/5 flex justify-between items-center">
            <span className="text-gray-300">Mode sombre</span>
            <span className="text-green-400 font-medium">Activé</span>
          </div>
          <div className="p-4 rounded-lg border border-white/10 bg-white/5 flex justify-between items-center">
            <span className="text-gray-300">Notifications</span>
            <span className="text-green-400 font-medium">Activées</span>
          </div>
          <div className="p-4 rounded-lg border border-white/10 bg-white/5 flex justify-between items-center">
            <span className="text-gray-300">Langue</span>
            <span className="text-green-400 font-medium">Français</span>
          </div>
        </div>
      </div>
    </main>
  );
}
