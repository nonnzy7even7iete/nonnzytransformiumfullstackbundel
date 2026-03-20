"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * COMPOSANT : CheckFilled
 * Un sous-composant utilitaire (SVG) pour l'icône de validation.
 * @param className Permet de styliser dynamiquement la couleur via Tailwind.
 */
const CheckFilled = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("w-6 h-6", className)}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * COMPOSANT : MultiStepLoader
 * Pourquoi "MultiStep" ? Parce qu'il gère une séquence d'états de chargement.
 * * CONCEPT PÉDAGOGIQUE : "The Backdrop Pattern"
 * On utilise une superposition de couches (Overlay + Contenu) pour capturer les
 * interactions utilisateur tout en protégeant le design.
 */
export const MultiStepLoader = ({
  loadingStates,
  loading,
  duration = 2000,
  onClose, // Reçu du parent (Zymantra) pour permettre la sortie
}: {
  loadingStates: { text: string }[];
  loading?: boolean;
  duration?: number;
  onClose?: () => void;
}) => {
  // L'état local suit l'index de l'étape actuelle
  const [currentState, setCurrentState] = useState(0);

  /**
   * LE MOTEUR DE SÉQUENCE : useEffect
   * On déclenche un timer qui incrémente l'étape automatiquement.
   */
  useEffect(() => {
    // Si loading s'arrête, on reset l'index à 0 pour la prochaine fois
    if (!loading) {
      setCurrentState(0);
      return;
    }

    // On passe à l'étape suivante après X millisecondes (duration)
    const timeout = setTimeout(() => {
      setCurrentState((prev) =>
        prev === loadingStates.length - 1 ? prev : prev + 1
      );
    }, duration);

    // NETTOYAGE (Cleanup) : Très important pour éviter les fuites de mémoire
    return () => clearTimeout(timeout);
  }, [currentState, loading, loadingStates.length, duration]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xl"
        >
          {/* COUCHE 1 : L'OVERLAY (Backdrop)
              Pourquoi ? Pour détecter le clic en dehors du texte. 
              On utilise 'absolute inset-0' pour qu'il prenne toute la place derrière.
          */}
          <div
            className="absolute inset-0 z-0 cursor-pointer"
            onClick={onClose}
            style={{ backgroundColor: "var(--card-bg-glass)" }}
          />

          {/* COUCHE 2 : LE CONTENU (Texte)
              'pointer-events-none' est utilisé ici pour que le clic traverse 
              le texte et soit capté par l'Overlay du dessous si on clique sur les marges.
          */}
          <div className="relative z-50 pointer-events-none">
            {loadingStates.map((state, index) => {
              const isCurrent = currentState === index; // Étape en cours
              const isPast = currentState > index; // Étape terminée

              return (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    // Logique d'opacité : Claire si courant, foncée si passé, presque invisible si futur
                    opacity: isCurrent ? 1 : isPast ? 0.3 : 0.1,
                    y: 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* L'icône change de couleur selon l'avancement */}
                  <CheckFilled
                    className={cn(
                      "transition-colors duration-500",
                      isCurrent || isPast
                        ? "text-emerald-500"
                        : "text-[var(--accents-2)]"
                    )}
                  />

                  <span
                    className={cn(
                      "text-lg font-bold uppercase tracking-tighter transition-colors duration-500",
                      isCurrent
                        ? "text-[var(--foreground)]"
                        : "text-[var(--accents-2)]"
                    )}
                  >
                    {state.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
