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
  height = 270,
  buttonContent,
  modalContent,
  className,
}: DataCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Card principale - Design Scrim réactif */}
      <Card
        className={cn(
          "relative flex flex-col items-center justify-start p-4 gap-4 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-[var(--radius-vercel)] shadow-lg transition-all duration-300",
          "w-[90vw] md:w-[300px] md:min-w-[300px] md:max-w-[300px]",
          className
        )}
        style={{ minHeight: height }}
      >
        {title && (
          /* Suppression du gris : utilisation d'une bordure nette et d'un fond transparent */
          <div className="w-full bg-transparent rounded-[var(--radius-vercel)] p-2 border border-[var(--border-color)] text-[var(--foreground)] text-sm font-bold italic tracking-tighter uppercase shadow-inner text-center">
            {title}
          </div>
        )}

        {content && (
          /* Remplacement de accents-1 par une opacité foreground ultra-légère (3%) */
          <div className="w-full bg-[var(--foreground)]/[0.03] rounded-[var(--radius-vercel)] p-3 border border-[var(--border-color)] flex flex-col gap-1 overflow-auto text-[var(--foreground)]/80 text-xs leading-relaxed">
            {content}
          </div>
        )}

        <Button
          variant="secondary"
          className="mt-auto w-full flex items-center justify-center gap-2 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-all outline-none border-none shadow-md"
          onClick={() => setModalOpen(true)}
        >
          <ChevronRight className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            {buttonContent || "Comprendre"}
          </span>
        </Button>
      </Card>

      {/* Modal overlay - Cohérence Totale */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4">
          {/* Overlay adaptatif au thème */}
          <div
            className="absolute inset-0 bg-[var(--background)]/85 backdrop-blur-[12px] transition-opacity duration-500"
            onClick={() => setModalOpen(false)}
          />

          <Card
            className={cn(
              "relative flex flex-col items-center justify-start z-[201] p-6 gap-4 rounded-[var(--radius-vercel)] shadow-2xl overflow-auto border transition-all duration-300",
              "bg-[var(--background)] border-[var(--border-color)] text-[var(--foreground)]"
            )}
            style={{
              width: "min(90vw, 400px)",
              maxHeight: "80vh",
              minHeight: height + 50,
            }}
          >
            {/* Modal Titre */}
            {title && (
              <div className="w-full bg-transparent rounded-[var(--radius-vercel)] p-4 border border-[var(--border-color)] shadow-sm">
                <div className="font-black italic uppercase tracking-tighter text-center">
                  {title}
                </div>
              </div>
            )}

            {/* Modal Contenu - Transparence cristalline */}
            {modalContent && (
              <div className="w-full bg-[var(--foreground)]/[0.02] rounded-[var(--radius-vercel)] p-5 border border-[var(--border-color)] flex flex-col gap-2 overflow-auto">
                <div className="text-xs leading-relaxed opacity-80 font-medium font-mono uppercase tracking-tight">
                  {modalContent}
                </div>
              </div>
            )}

            {/* Bouton fermeture */}
            <Button
              variant="destructive"
              className="mt-6 w-full flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] shadow-lg rounded-[var(--radius-vercel)] active:scale-95 transition-transform"
              onClick={() => setModalOpen(false)}
            >
              <XCircle className="w-4 h-4" />
              Fermer l'accès
            </Button>
          </Card>
        </div>
      )}
    </>
  );
}
