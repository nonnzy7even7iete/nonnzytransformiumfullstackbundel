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
      {/* Card principale */}
      <Card
        className={cn(
          "relative flex flex-col items-center justify-start p-4 gap-4 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg",
          "w-[90vw] md:w-[300px] md:min-w-[300px] md:max-w-[300px]",
          className
        )}
        style={{ minHeight: height }}
      >
        <style jsx>{`
          div {
            --card-width: 90vw;
          }
          @media (min-width: 768px) {
            div {
              --card-width: 300px;
            }
          }
        `}</style>

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

      {/* Modal overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
          <Card
            className={cn(
              "relative flex flex-col items-center justify-start z-[101] p-4 gap-4 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg max-h-[85vh] overflow-auto",
              /* MODAL : 90vw mobile | 400px desktop */
              "w-[90vw] md:w-[400px] md:min-w-[400px] md:max-w-[400px]",
              /* Sécurité Navbar : On ajoute une marge haute pour décoller du header */
              "mt-16 md:mt-20"
            )}
            style={{ minHeight: height + 50 }}
          >
            {/* Modal Titre */}
            {title && (
              <Card className="w-full bg-black/30 backdrop-blur-xl rounded-xl p-2 border border-white/10 font-bold text-white">
                {title}
              </Card>
            )}

            {/* Modal Contenu */}
            {modalContent && (
              <Card className="w-full bg-black/30 backdrop-blur-xl rounded-xl p-2 border border-white/10 flex flex-col gap-1 overflow-auto text-white/90">
                {modalContent}
              </Card>
            )}

            {/* Bouton fermeture */}
            <Button
              variant="destructive"
              className="mt-auto w-full flex items-center justify-center gap-2 
             bg-gradient-to-r from-red-600 via-transparent to-black 
             text-red-500 border border-red-500 hover:from-red-700 hover:to-black 
             hover:text-red-600 transition-all duration-300"
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
