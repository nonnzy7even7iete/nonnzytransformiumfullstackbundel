"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export default function DataCard() {
  // <- export par défaut
  const [showCard, setShowCard] = useState(false);

  const data = {
    visiteurs: 7500,
    revenuMois: "420 000 €",
    emploisDirects: 180,
  };

  return (
    <div className="relative flex flex-col items-center mt-6">
      <Button
        variant="ghost"
        onClick={() => setShowCard(!showCard)}
        className="p-4 rounded-full bg-gray-800 hover:bg-gray-700 shadow-neumorph"
      >
        <Info className="w-6 h-6 text-white" />
      </Button>

      {showCard && (
        <Card className="mt-4 w-80 bg-gray-900 text-white shadow-neumorph transition-transform transform hover:scale-105">
          <CardHeader>
            <CardTitle>Statistiques du Centre</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Visiteurs hebdomadaires : {data.visiteurs}</p>
            <p>Revenu mensuel estimé : {data.revenuMois}</p>
            <p>Emplois directs : {data.emploisDirects}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
