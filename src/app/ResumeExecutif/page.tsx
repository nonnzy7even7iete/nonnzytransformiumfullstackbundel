"use client";

import NavbarFront from "@/components/NavbarFront";

export default function ResumeExecutifPage() {
  return (
    <>
      <NavbarFront />

      <main className="min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center">
        <div className="max-w-3xl text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-white/90">
            Résumé Exécutif
          </h1>

          <p className="text-lg text-white/60 leading-relaxed">
            En cours de redaction{" "}
          </p>
        </div>

        <div className="text-center text-white/50 mt-24 text-sm">
          Abidjan , Anyama , cote d ivoire : © Nonnzytransformium2025
        </div>
      </main>
    </>
  );
}
