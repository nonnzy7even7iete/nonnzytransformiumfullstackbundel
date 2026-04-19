"use client";

/**
 * @file AudioEngine.tsx
 * @description Moteur audio universel piloté par props pour Nonnzytransformium.
 * Ce composant est "renderless" (il ne produit pas de HTML visuel, seulement de la logique).
 */

import { useEffect, useRef } from "react";

/**
 * @interface AudioEngineProps
 * Définit la structure des données que le composant accepte.
 * Le symbole '?' indique que la propriété est optionnelle.
 */
interface AudioEngineProps {
  src: string; // Chemin vers le fichier .mp3 dans le dossier public
  isPlaying: boolean; // État de lecture (true = joue, false = pause)
  volume?: number; // Niveau sonore de 0.0 à 1.0
  loop?: boolean; // Si le son doit recommencer à la fin
  onEnded?: () => void; // Fonction à exécuter quand le son se termine
}

export const AudioEngine = ({
  src,
  isPlaying,
  volume = 0.5,
  loop = false,
  onEnded,
}: AudioEngineProps) => {
  /**
   * .useRef : Nous créons une référence pour stocker l'objet Audio.
   * On précise <HTMLAudioElement | null> pour que TypeScript comprenne
   * qu'au début (initialisation), la référence est vide (null).
   */
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    /**
     * .typeof window : Next.js exécute le code sur le serveur et le client.
     * L'objet 'Audio' n'existe que sur le navigateur (window).
     * On vérifie donc sa présence pour éviter une erreur de compilation.
     */
    if (typeof window === "undefined") return;

    /**
     * .current : Accède à la valeur stockée dans la référence.
     * Si audioRef.current n'existe pas, on crée une nouvelle instance.
     */
    if (!audioRef.current) {
      // .new Audio(src) : Constructeur JavaScript pour charger un média sonore.
      audioRef.current = new Audio(src);
    } else if (audioRef.current.src !== src) {
      /**
       * .src : Notation par point pour accéder à l'URL de la source.
       * Si le chemin 'src' change via les props, on met à jour l'objet existant.
       */
      audioRef.current.src = src;
    }

    // On crée une constante locale pour faciliter la lecture du code.
    const audio = audioRef.current;
    if (!audio) return;

    /**
     * RÉGLAGES VIA NOTATION PAR POINT (Dot Notation)
     * On accède directement aux propriétés de l'élément HTMLAudioElement.
     */
    audio.volume = volume; // Définit la puissance sonore.
    audio.loop = loop; // Définit si la lecture tourne en boucle (booléen).

    /**
     * .onended : Propriété qui reçoit une fonction de callback.
     * Elle se déclenche automatiquement à la fin du fichier audio.
     */
    if (onEnded) {
      audio.onended = onEnded;
    }

    /**
     * CONTRÔLE DE LECTURE
     */
    if (isPlaying) {
      /**
       * .play() : Méthode pour démarrer la lecture.
       * Elle retourne une "Promise". On utilise .catch() pour intercepter
       * l'erreur si le navigateur bloque l'audio (protection contre le bruit forcé).
       */
      audio.play().catch((err) => {
        console.warn("Lecture audio suspendue : interaction requise.", err);
      });
    } else {
      /**
       * .pause() : Méthode pour arrêter la lecture.
       */
      audio.pause();
    }

    /**
     * NETTOYAGE (Cleanup function)
     * Cette fonction s'exécute quand le composant est retiré de l'écran.
     * On coupe le son pour éviter qu'il ne joue "en fantôme" en arrière-plan.
     */
    return () => {
      audio.pause();
      audio.onended = null;
    };
  }, [src, isPlaying, volume, loop, onEnded]); // Le useEffect surveille ces variables.

  // On ne retourne rien car c'est un moteur logique pure.
  return null;
};
