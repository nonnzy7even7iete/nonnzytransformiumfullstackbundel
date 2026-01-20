"use client";

import React, { useState, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataCardProps {
  title?: ReactNode;
  content?: ReactNode;
  width?: number;
  height?: number;
  buttonContent?: ReactNode;
  modalContent?: ReactNode;
  className?: string;
}

export default function DataCard({
  title,
  content,
  width = 270,
  height = 270,
  buttonContent,
  modalContent,
  className,
}: DataCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Card principale - Inchangée pour ne pas casser ton design sombre habituel */}
      <Card
        className={cn(
          "relative flex flex-col items-center justify-start p-4 gap-4 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg",
          "w-[90vw] md:w-[300px] md:min-w-[300px] md:max-w-[300px]",
          className
        )}
        style={{ minHeight: height }}
      >
        {title && (
          <Card className="w-full bg-black/30 backdrop-blur-xl rounded-xl p-2 border border-white/10">
            {title}
          </Card>
        )}

        {content && (
          <Card className="w-full bg-black/30 backdrop-blur-xl rounded-xl p-2 border border-white/10 flex flex-col gap-1 overflow-auto">
            {content}
          </Card>
        )}

        <Button
          variant="secondary"
          className="mt-auto w-full flex items-center justify-center gap-2"
          onClick={() => setModalOpen(true)}
        >
          <ChevronRight className="w-4 h-4" />
          {buttonContent || "Comprendre"}
        </Button>
      </Card>

      {/* Modal overlay - REFACTO LIGHT MODE */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 transition-all duration-300">
          {/* BACKGROUND OVERLAY : C'est ici qu'on gère l'opacité pour bloquer le texte arrière */}
          <div className="absolute inset-0 bg-white/80 dark:bg-black/60 backdrop-blur-[40px]" />

          <div className="h-20 w-full flex-shrink-0 z-[101]" />

          <Card
            className={cn(
              "relative flex flex-col items-center justify-start z-[101] p-6 gap-4 rounded-2xl shadow-2xl overflow-auto border transition-colors",
              /* LIGHT MODE : Fond blanc cassé presque opaque pour bloquer le texte de fond */
              "bg-[#fdfdfd] border-gray-200 text-black",
              /* DARK MODE : On garde ton style actuel */
              "dark:bg-black/40 dark:border-white/10 dark:text-white"
            )}
            style={{
              width: "min(90vw, 400px)",
              maxHeight: "80vh",
              minHeight: height + 50,
            }}
          >
            {/* Modal Titre */}
            {title && (
              <Card className="w-full bg-gray-100/50 dark:bg-black/30 rounded-xl p-3 border border-gray-200 dark:border-white/10">
                <div className="font-bold text-center">{title}</div>
              </Card>
            )}

            {/* Modal Contenu - Background neutre pour lisibilité maximale */}
            {modalContent && (
              <Card className="w-full bg-white/50 dark:bg-black/30 rounded-xl p-4 border border-gray-200 dark:border-white/10 flex flex-col gap-2 overflow-auto">
                <div className="text-sm leading-relaxed">{modalContent}</div>
              </Card>
            )}

            {/* Bouton fermeture */}
            <Button
              variant="destructive"
              className="mt-6 w-full flex items-center justify-center gap-2 font-bold shadow-md"
              onClick={() => setModalOpen(false)}
            >
              <XCircle className="w-4 h-4" />
              Fermer
            </Button>
          </Card>

          <div className="flex-grow z-[101]" />
        </div>
      )}
    </>
  );
}
