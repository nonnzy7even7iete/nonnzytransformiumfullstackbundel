"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend, ThreeElement } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "next-themes"; // Optionnel : si tu utilises next-themes

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

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

interface WorldProps {
  globeConfig?: any;
  data: Position[];
}

export function Globe({ data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { resolvedTheme } = useTheme(); // Détecte le mode sombre/clair
  const [isInitialized, setIsInitialized] = useState(false);

  // Définition des couleurs dynamiques selon le thème
  const isDark = resolvedTheme === "dark";
  const colors = {
    globe: isDark ? "#05070a" : "#f8fafc",
    land: isDark ? "rgba(34, 197, 94, 0.15)" : "rgba(34, 197, 94, 0.3)",
    atmosphere: isDark ? "#22c55e" : "#16a34a",
    point: isDark ? "#ffffff" : "#0f172a",
    arc: "#22c55e", // Le vert reste l'identité de Nonnzy
  };

  useEffect(() => {
    if (groupRef.current && !globeRef.current) {
      const globe = new ThreeGlobe();
      globeRef.current = globe;
      groupRef.current.add(globe);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    // 1. MISE À JOUR DYNAMIQUE DES MATÉRIAUX
    const globeMaterial =
      globeRef.current.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color(colors.globe);
    globeMaterial.emissive = new THREE.Color(isDark ? "#000000" : "#ffffff");
    globeMaterial.emissiveIntensity = isDark ? 0.1 : 0.05;

    // 2. CONTINENTS RÉACTIFS
    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.12)
      .hexPolygonColor(() => colors.land)
      .hexPolygonAltitude(0.01);

    // 3. ATMOSPHÈRE RÉACTIVE
    globeRef.current
      .showAtmosphere(true)
      .atmosphereColor(colors.atmosphere)
      .atmosphereAltitude(isDark ? 0.15 : 0.08);

    // 4. ARCS (Fils de données)
    if (data && data.length > 0) {
      globeRef.current
        .arcsData(data)
        .arcStartLat((d: any) => d.startLat)
        .arcStartLng((d: any) => d.startLng)
        .arcEndLat((d: any) => d.endLat)
        .arcEndLng((d: any) => d.endLng)
        .arcColor((d: any) => d.color || colors.arc)
        .arcAltitude((d: any) => d.arcAlt)
        .arcStroke(0.6)
        .arcDashLength(0.95)
        .arcDashGap(2)
        .arcDashInitialGap(1)
        .arcDashAnimateTime(6000);

      // 5. POINTS (Nodes de connexion)
      globeRef.current
        .pointsData(
          data.flatMap((d) => [
            { lat: d.startLat, lng: d.startLng, color: colors.arc, size: 1.2 },
            { lat: d.endLat, lng: d.endLng, color: colors.point, size: 1.0 },
          ])
        )
        .pointColor((d: any) => d.color)
        .pointRadius((d: any) => d.size);

      // 6. RINGS (Onde de choc)
      globeRef.current
        .ringsData([
          { lat: data[0].startLat, lng: data[0].startLng, color: colors.arc },
        ])
        .ringColor((d: any) => d.color)
        .ringMaxRadius(4)
        .ringRepeatPeriod(2000);
    }
  }, [isInitialized, data, resolvedTheme]); // Se relance quand le thème change

  return <group ref={groupRef} />;
}

export function World(props: WorldProps) {
  const { resolvedTheme } = useTheme();
  const bgColor = resolvedTheme === "dark" ? "#000000" : "#ffffff";

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ fov: 45, near: 10, far: 2000, position: [0, 0, cameraZ] }}
      >
        <color attach="background" args={[bgColor]} />

        <ambientLight intensity={resolvedTheme === "dark" ? 1.2 : 2.0} />
        <directionalLight
          position={[-100, 200, 100]}
          intensity={1}
          color={resolvedTheme === "dark" ? "#22c55e" : "#16a34a"}
        />

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
