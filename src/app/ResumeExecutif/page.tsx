"use client";

import NavbarFront from "@/components/NavbarFront";
import { WorldMap } from "@/components/WorldMap"; // adapte le chemin si nécessaire

export default function ResumeExecutifPage() {
  const dots = [
    {
      start: { lat: 48.8566, lng: 2.3522 },
      end: { lat: 40.7128, lng: -74.006 },
    },
    {
      start: { lat: 35.6895, lng: 139.6917 },
      end: { lat: 51.5074, lng: -0.1278 },
    },
  ];

  return (
    <>
      <NavbarFront /> {/* Navbar en haut */}
      <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
        <h1 className="text-4xl font-bold mb-6">Résumé Exécutif</h1>
        <p className="text-gray-300 text-center max-w-xl mb-8">
          Cette page est accessible sans authentification.
        </p>

        {/* Globe / Carte interactive */}
        <div className="w-full max-w-7xl">
          <WorldMap dots={dots} lineColor="#0ea5e9" />
        </div>
      </main>
    </>
  );
}
