"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend, ThreeElement } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Chemin relatif vers ton dossier src/data
import countries from "../../data/globe.json";

// Extension de l'élément pour Fiber
extend({ ThreeGlobe: ThreeGlobe });

// Déclaration globale pour éviter toute erreur JSX
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

  const config = {
    pointSize: 1,
    atmosphereColor: "#3b82f6",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.15)",
    globeColor: "#060910",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
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

    const globeMaterial =
      globeRef.current.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color(config.globeColor);
    globeMaterial.emissive = new THREE.Color(config.emissive);
    globeMaterial.emissiveIntensity = config.emissiveIntensity;
    globeMaterial.shininess = config.shininess;

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.1)
      .hexPolygonColor(() => config.polygonColor)
      .showAtmosphere(config.showAtmosphere)
      .atmosphereColor(config.atmosphereColor)
      .atmosphereAltitude(config.atmosphereAltitude);

    if (data) {
      globeRef.current
        .arcsData(data)
        .arcStartLat((d: any) => d.startLat)
        .arcStartLng((d: any) => d.startLng)
        .arcEndLat((d: any) => d.endLat)
        .arcEndLng((d: any) => d.endLng)
        .arcColor((d: any) => d.color)
        .arcAltitude((d: any) => d.arcAlt)
        .arcDashLength(config.arcLength)
        .arcDashInitialGap((d: any) => d.order)
        .arcDashGap(15)
        .arcDashAnimateTime(() => config.arcTime);
    }
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
      <ambientLight intensity={0.5} />
      <pointLight position={[200, 200, 200]} intensity={0.8} />

      <Globe {...props} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}
