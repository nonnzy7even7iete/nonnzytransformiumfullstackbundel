"use client";

import dynamic from "next/dynamic";
import React from "react";

const GlobeClient = dynamic(() => import("./globe-client"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-emerald-500 animate-pulse">
      INIT_GLOBE...
    </div>
  ),
});

export function World(props: any) {
  return (
    <div className="absolute inset-0 w-full h-full bg-transparent">
      <GlobeClient {...props} />
    </div>
  );
}
