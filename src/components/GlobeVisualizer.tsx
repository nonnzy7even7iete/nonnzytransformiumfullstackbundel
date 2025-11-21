"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import ThreeGlobe from "three-globe";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Étend ThreeGlobe pour React Three Fiber
extend({ ThreeGlobe });

// Types pour les arcs et points
export type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

// Type pour la config du globe
export type GlobeConfig = {
  globeColor?: string;
  atmosphereColor?: string;
  showAtmosphere?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

// Composant Globe
export function World({
  data,
  globeConfig,
}: {
  data: Position[];
  globeConfig?: GlobeConfig;
}) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [initialized, setInitialized] = useState(false);

  const defaultConfig: GlobeConfig = {
    globeColor: "#1d072e",
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    autoRotate: true,
    autoRotateSpeed: 0.2,
    ...globeConfig,
  };

  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe({ animateIn: true });
      groupRef.current.add(globeRef.current as unknown as THREE.Object3D);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!initialized || !globeRef.current) return;

    globeRef.current.pointsData(
      data.map((d) => ({
        lat: d.startLat,
        lng: d.startLng,
        color: d.color,
        size: 1,
      }))
    );

    globeRef.current
      .arcsData(data)
      .arcStartLat((d: any) => d.startLat)
      .arcStartLng((d: any) => d.startLng)
      .arcEndLat((d: any) => d.endLat)
      .arcEndLng((d: any) => d.endLng)
      .arcAltitude((d: any) => d.arcAlt)
      .arcColor((d: any) => d.color)
      .arcDashLength(0.8)
      .arcDashGap(4)
      .arcDashAnimateTime(1000);
  }, [initialized, data]);

  return (
    <Canvas
      camera={{ position: [0, 0, 300], fov: 50 }}
      className="rounded-xl bg-black"
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 200, 200]} intensity={0.8} />
      <group ref={groupRef} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={defaultConfig.autoRotate}
        autoRotateSpeed={defaultConfig.autoRotateSpeed || 0.2}
      />
    </Canvas>
  );
}
