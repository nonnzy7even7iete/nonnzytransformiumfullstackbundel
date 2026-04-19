"use client";

/**
 * @file AudioEngine.tsx
 * @description Moteur audio universel piloté par props.
 * @version 1.4.0
 * * NOTE JUNIOR :
 * - typeof window !== "undefined" : Vérifie que nous sommes sur le navigateur.
 * Sans cela, Next.js essaie de créer l'objet Audio sur le serveur, ce qui cause une erreur.
 * - HTMLAudioElement | null : Typage TypeScript pour indiquer que la ref peut être vide.
 */

import { useEffect, useRef } from "react";

// Définition de l'interface pour le typage des props (Paramètres de réglage).
interface AudioEngineProps {
  src: string; // Chemin du fichier (ex: "/mon-audio.mp3")
  isPlaying: boolean; // État de lecture
  volume?: number; // Puissance (0.0 à 1.0)
  loop?: boolean; // Répétition
  onEnded?: () => void; // Fonction déclenchée à la fin
}

export const AudioEngine = ({
  src,
  isPlaying,
  volume = 0.5,
  loop = false,
  onEnded,
}: AudioEngineProps) => {
  // .useRef : Permet de stocker l'instance audio sans déclencher de re-rendu inutile.
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // ÉTAPE 1 : Sécurité contre le SSR (Server Side Rendering).
    // L'objet 'Audio' n'existe que dans le navigateur.
    if (typeof window === "undefined") return;

    // ÉTAPE 2 : Initialisation ou mise à jour de la source.
    if (!audioRef.current) {
      // .new Audio() : Constructeur natif JavaScript.
      audioRef.current = new Audio(src);
    } else if (audioRef.current.src !== src) {
      // .src : On met à jour le lien si la prop change.
      audioRef.current.src = src;
    }

    const audio = audioRef.current;

    // ÉTAPE 3 : Application des paramètres via la notation par point (dot notation).
    audio.volume = volume; // audio.volume accède à la propriété de puissance sonore.
    audio.loop = loop; // audio.loop accède au booléen de répétition.

    // .onended : Attachement de la fonction de rappel à la fin du son.
    if (onEnded) {
      audio.onended = onEnded;
    }

    // ÉTAPE 4 : Contrôle de la lecture.
    if (isPlaying) {
      // .play() : Retourne une promesse. On utilise .catch pour éviter l'erreur console
      // si l'utilisateur n'a pas encore cliqué sur la page.
      audio.play().catch((err) => {
        console.warn("AudioEngine : En attente d'interaction.", err);
      });
    } else {
      // .pause() : Méthode native pour stopper.
      audio.pause();
    }

    // ÉTAPE 5 : Cleanup (Nettoyage).
    // Très important pour éviter que le son continue si on quitte la page.
    return () => {
      audio.pause();
      audio.onended = null;
    };
  }, [src, isPlaying, volume, loop, onEnded]);

  // Ce composant ne rend aucun élément HTML visuel (Renderless component).
  return null;
};
