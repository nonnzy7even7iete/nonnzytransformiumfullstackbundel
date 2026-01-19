"use client";

import NavbarFront from "@/components/NavbarFront";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export default function ResumeExecutifPage() {
  return (
    <>
      <NavbarFront />

      {/* On utilise relative et overflow-hidden pour que le background reste bien derrière */}
      <main className="relative min-h-screen bg-background text-foreground transition-colors duration-300 px-6 py-20 flex flex-col items-center overflow-hidden">
        {/* Intégration du composant : il prend tout l'espace du main */}
        <DottedGlowBackground
          gap={20}
          radius={1.2}
          opacity={0.3} // Discret pour ne pas gêner la lecture
          speedScale={0.5} // Animation lente et élégante
          colorLightVar="--border" // Utilise ton Gray-300 en Light mode
          colorDarkVar="--foreground" // Utilise le blanc cassé en Dark mode
          darkGlowColor="#3b82f6" // Petite lueur bleue en Dark mode
        />

        {/* Tout le contenu doit être en relative z-10 pour passer au-dessus des points */}
        <div className="relative z-10 max-w-3xl text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 opacity-90">
            Résumé Exécutif
          </h1>

          <p className="text-lg opacity-60 leading-relaxed">
            En cours de rédaction
          </p>
        </div>

        <div className="relative z-10 text-center opacity-50 mt-24 text-sm">
          Abidjan, Anyama, Côte d'Ivoire : © Nonnzytransformium2025
        </div>
      </main>
    </>
  );
}
