"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Loader from "@/components/Loader";

// Fake data simulant une API
const mockAwards = [
  {
    id: 1,
    title: "Meilleur Entrepreneur",
    status: "Validé",
    desc: "Récompense de l’innovation",
  },
  {
    id: 2,
    title: "Potentiel ",
    status: "En attente",
    desc: "Vote du public en cours",
  },
  {
    id: 3,
    title: "Jeune Talent",
    status: "Refusé",
    desc: "Non retenu cette année",
  },
  {
    id: 4,
    title: "Projet Solidaire",
    status: "Validé",
    desc: "Impact social reconnu",
  },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") return <Loader />;
  if (!session) return null;

  // Stats rapides
  const total = mockAwards.length;
  const valides = mockAwards.filter((a) => a.status === "Validé").length;

  return (
    <div className="flex flex-col h-screen bg-black/90 text-white font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 pt-28 px-3 overflow-auto ml-0 md:ml-20 mb-16 md:mb-0">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-green-400/80">
              Awards Côte d’Ivoire 2026
            </h1>
            <p className="text-gray-300/80 mt-2">
              Bienvenue, {session.user?.name}
            </p>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <h2 className="text-xl font-bold">{total}</h2>
              <p className="text-sm text-gray-400">Total Awards</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <h2 className="text-xl font-bold text-green-400">{valides}</h2>
              <p className="text-sm text-gray-400">Validés</p>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAwards.map((award) => (
              <div
                key={award.id}
                onClick={() => setSelected(award)}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 
                           hover:border-green-400/40 hover:scale-105 transition-all cursor-pointer 
                           flex flex-col items-center justify-center text-center h-40"
              >
                <h2 className="text-lg font-semibold mb-1 text-white/90">
                  {award.title}
                </h2>
                <p className="text-gray-300/70 text-sm">{award.desc}</p>
                <span
                  className={`mt-3 inline-block px-3 py-1 rounded-full text-xs ${
                    award.status === "Validé"
                      ? "bg-green-500/20 text-green-400"
                      : award.status === "En attente"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {award.status}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full border border-white/20 text-center">
            <h2 className="text-2xl font-bold text-green-400 mb-2">
              {selected.title}
            </h2>
            <p className="text-gray-300 mb-4">{selected.desc}</p>
            <p className="text-sm text-gray-400 mb-6">
              Statut : {selected.status}
            </p>
            <button
              onClick={() => setSelected(null)}
              className="px-6 py-2 bg-green-500/20 text-green-300 rounded-xl 
                         hover:bg-green-500/30 transition font-semibold"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
