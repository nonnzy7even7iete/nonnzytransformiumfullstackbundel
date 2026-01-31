"use client";

import dynamic from "next/dynamic";
import React from "react";

// On force Next.js à ne charger ce composant QUE sur le client
const GlobeClient = dynamic(
  () => import("@components/frontendkit/globe-client"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#050505]" />,
  }
);

export function World(props: any) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <GlobeClient {...props} />
    </div>
  );
}
