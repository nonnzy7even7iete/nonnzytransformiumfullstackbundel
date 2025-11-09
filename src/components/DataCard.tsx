"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataCardProps {
  title?: string;
  info?: {
    visiteurs?: number;
    revenuMois?: string;
    emploisDirects?: number;
  };
  width?: number;
  height?: number;
  buttonText?: string;
}

export default function DataCard({
  title = "Statistiques du Centre",
  info = { visiteurs: 7500, revenuMois: "420 000 €", emploisDirects: 180 },
  width = 270,
  height = 270,
  buttonText = "Comprendre",
}: DataCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Card principale */}
      <Card
        className={cn(
          "relative flex flex-col items-center justify-start p-4 gap-4",
          "bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg"
        )}
        style={{ width, height }}
      >
        {/* Titre */}
        <Card className="w-full bg-white/10 backdrop-blur-md rounded-xl p-2">
          <CardTitle className="text-center text-white font-semibold">
            {title}
          </CardTitle>
        </Card>

        {/* Infos */}
        <Card className="w-full bg-white/10 backdrop-blur-md rounded-xl p-2 flex flex-col gap-1">
          <p className="text-white text-sm">
            Visiteurs hebdomadaires : {info.visiteurs}
          </p>
          <p className="text-white text-sm">
            Revenu mensuel : {info.revenuMois}
          </p>
          <p className="text-white text-sm">
            Emplois directs : {info.emploisDirects}
          </p>
        </Card>

        {/* Bouton */}
        <Button
          variant="secondary"
          className="mt-auto w-full flex items-center justify-center gap-2"
          onClick={() => setModalOpen(true)}
        >
          <ChevronRight className="w-4 h-4" />
          {buttonText}
        </Button>
      </Card>

      {/* Modal overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <Card
            className={cn(
              "relative flex flex-col items-center justify-start p-4 gap-4",
              "bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg"
            )}
            style={{ width: width + 50, height: height + 50 }}
          >
            {/* Titre dans modal */}
            <Card className="w-full bg-white/10 backdrop-blur-md rounded-xl p-2">
              <CardTitle className="text-center text-white font-semibold">
                {title} - Détails
              </CardTitle>
            </Card>

            {/* Infos supplémentaires */}
            <Card className="w-full bg-white/10 backdrop-blur-md rounded-xl p-2 flex flex-col gap-1">
              <p className="text-white text-sm">
                Visiteurs hebdomadaires : {info.visiteurs}
              </p>
              <p className="text-white text-sm">
                Revenu mensuel : {info.revenuMois}
              </p>
              <p className="text-white text-sm">
                Emplois directs : {info.emploisDirects}
              </p>
              <p className="text-white text-sm">
                Autres informations modifiables via props
              </p>
            </Card>

            {/* Bouton fermeture */}
            <Button
              variant="destructive"
              className="mt-auto w-full"
              onClick={() => setModalOpen(false)}
            >
              Fermer
            </Button>
          </Card>
        </div>
      )}
    </>
  );
}
