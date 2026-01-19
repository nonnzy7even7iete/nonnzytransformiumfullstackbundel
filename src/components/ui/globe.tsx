"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend, ThreeElement } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Chemin vers ton fichier de données
import countries from "../../data/globe.json";

extend({ ThreeGlobe: ThreeGlobe });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      threeGlobe: ThreeElement<typeof ThreeGlobe>;
    }
  }
}

const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Configuration par défaut optimisée pour le look "Data-Viz"
  const config = {
    pointSize: 1,
    atmosphereColor: "#166534", // Vert émeraude sombre
    showAtmosphere: true,
    atmosphereAltitude: 0.15,
    polygonColor: "rgba(34, 197, 94, 0.08)",
    globeColor: "#05070a",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.4,
    ...globeConfig,
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

    // 1. Matériau du Globe (Finition mate et profonde)
    const globeMaterial =
      globeRef.current.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color(config.globeColor);
    globeMaterial.emissive = new THREE.Color(config.emissive);
    globeMaterial.emissiveIntensity = config.emissiveIntensity;
    globeMaterial.shininess = config.shininess;

    // 2. Pays (Hexagones précis)
    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.12)
      .hexPolygonColor(() => config.polygonColor)
      .showAtmosphere(config.showAtmosphere)
      .atmosphereColor(config.atmosphereColor)
      .atmosphereAltitude(config.atmosphereAltitude);

    // 3. Arcs de données (Effet Fibre Optique)
    globeRef.current
      .arcsData(data)
      .arcStartLat((d: any) => d.startLat)
      .arcStartLng((d: any) => d.startLng)
      .arcEndLat((d: any) => d.endLat)
      .arcEndLng((d: any) => d.endLng)
      .arcColor((d: any) => d.color)
      .arcAltitude((d: any) => d.arcAlt)
      .arcStroke(() => 0.4) // Ligne très fine et élégante
      .arcDashLength(config.arcLength)
      .arcDashInitialGap(0)
      .arcDashGap(4)
      .arcDashAnimateTime(() => config.arcTime);

    // 4. Points d'ancrage (Pour marquer Abidjan et la destination)
    const pointsData = data.flatMap((d) => [
      { lat: d.startLat, lng: d.startLng, color: d.color, size: 0.6 },
      { lat: d.endLat, lng: d.endLng, color: d.color, size: 0.6 },
    ]);

    globeRef.current
      .pointsData(pointsData)
      .pointColor((d: any) => d.color)
      .pointAltitude(0.01)
      .pointRadius((d: any) => d.size);
  }, [isInitialized, data, config]);

  return <group ref={groupRef} />;
}

export function World(props: WorldProps) {
  return (
    <Canvas
      camera={{ fov: 50, near: 180, far: 1800, position: [0, 0, cameraZ] }}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 400, 2000]} />

      {/* Éclairage pour faire ressortir la courbure du globe */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[400, 100, 400]}
        intensity={1.2}
        color="#166534"
      />
      <pointLight position={[-200, 500, 200]} intensity={0.8} />

      <Globe {...props} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={true}
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}
