"use client";

import React, { useState, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataCardProps {
  title?: ReactNode; // n'importe quel JSX
  content?: ReactNode; // contenu principal
  width?: number;
  height?: number;
  buttonContent?: ReactNode; // bouton “Comprendre”
  modalContent?: ReactNode; // contenu du modal
}

export default function DataCard({
  title,
  content,
  width = 270,
  height = 270,
  buttonContent,
  modalContent,
}: DataCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Card principale */}
      <Card
        className={cn(
          "relative flex flex-col items-center justify-start p-4 gap-4",
          "bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg",
          "w-full max-w-[270px] min-h-[270px]"
        )}
        style={{ width, height }}
      >
        {/* Titre */}
        {title && (
          <Card className="w-full bg-black/30 backdrop-blur-xl rounded-xl p-2 border border-white/10">
            {title}
          </Card>
        )}

        {/* Contenu principal */}
        {content && (
          <Card className="w-full bg-black/30 backdrop-blur-xl rounded-xl p-2 border border-white/10 flex flex-col gap-1">
            {content}
          </Card>
        )}

        {/* Bouton */}
        <Button
          variant="secondary"
          className="mt-auto w-full flex items-center justify-center gap-2"
          onClick={() => setModalOpen(true)}
        >
          <ChevronRight className="w-4 h-4" />
          {buttonContent || "Comprendre"}
        </Button>
      </Card>

      {/* Modal overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <Card
            className={cn(
              "relative flex flex-col items-center justify-start p-4 gap-4",
              "bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg"
            )}
            style={{ width: width + 50, height: height + 50 }}
          >
            {/* Modal Titre */}
            {title && (
              <Card className="w-full bg-black/30 backdrop-blur-xl rounded-xl p-2 border border-white/10">
                {title}
              </Card>
            )}

            {/* Modal Contenu */}
            {modalContent && (
              <Card className="w-full bg-black/30 backdrop-blur-xl rounded-xl p-2 border border-white/10 flex flex-col gap-1">
                {modalContent}
              </Card>
            )}

            {/* Bouton fermeture */}
            <Button
              variant="destructive"
              className="mt-auto w-full flex items-center justify-center gap-2"
              onClick={() => setModalOpen(false)}
            >
              <XCircle className="w-4 h-4" />
              Fermer
            </Button>
          </Card>
        </div>
      )}
    </>
  );
}
