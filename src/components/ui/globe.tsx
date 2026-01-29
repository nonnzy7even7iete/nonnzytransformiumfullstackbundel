"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend, ThreeElement } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "next-themes";
import countries from "../../data/globe.json";

extend({ ThreeGlobe: ThreeGlobe });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      threeGlobe: ThreeElement<typeof ThreeGlobe>;
    }
  }
}

const cameraZ = 320;

// 1. Singleton pour éviter de recréer l'instance à chaque re-rendu
let sharedGlobeInstance: ThreeGlobe | null = null;

export function Globe({ data }: { data: any[] }) {
  const groupRef = useRef<THREE.Group>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // 2. Memoization des couleurs pour éviter les calculs inutiles
  const colors = useMemo(
    () => ({
      globe: isDark ? "#05070a" : "#f8fafc",
      land: isDark ? "rgba(34, 197, 94, 0.15)" : "rgba(34, 197, 94, 0.3)",
      atmosphere: isDark ? "#22c55e" : "#16a34a",
      point: isDark ? "#ffffff" : "#0f172a",
      arc: "#22c55e",
    }),
    [isDark]
  );

  useEffect(() => {
    if (!groupRef.current) return;

    // Réutilisation de l'instance si elle existe déjà
    if (!sharedGlobeInstance) {
      sharedGlobeInstance = new ThreeGlobe();
    }

    const globe = sharedGlobeInstance;
    groupRef.current.add(globe);

    // Optimisation : On ne charge les polygones qu'une seule fois
    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.12)
      .hexPolygonColor(() => colors.land)
      .hexPolygonAltitude(0.01)
      .showAtmosphere(true)
      .atmosphereColor(colors.atmosphere)
      .atmosphereAltitude(isDark ? 0.15 : 0.08);

    const globeMaterial = globe.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color(colors.globe);

    // Nettoyage lors du démontage pour éviter les fuites mémoire mais garder l'instance
    return () => {
      if (groupRef.current) groupRef.current.remove(globe);
    };
  }, [colors, isDark]);

  // Gestion des ARCS séparée pour la performance
  useEffect(() => {
    if (!sharedGlobeInstance || !data) return;

    sharedGlobeInstance
      .arcsData(data)
      .arcColor((d: any) => d.color || colors.arc)
      .arcDashAnimateTime(6000);
  }, [data, colors.arc]);

  return <group ref={groupRef} />;
}

export function World(props: any) {
  const { resolvedTheme } = useTheme();
  const [ready, setReady] = useState(false);

  // 3. On attend que le composant soit monté pour éviter le mismatch SSR
  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null; // Ou un placeholder très léger

  return (
    <div className="absolute inset-0 w-full h-full bg-transparent">
      <Canvas
        camera={{ fov: 45, near: 10, far: 2000, position: [0, 0, cameraZ] }}
        gl={{
          antialias: false, // Performance ++
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={resolvedTheme === "dark" ? 1.2 : 2.0} />
        <Globe {...props} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
