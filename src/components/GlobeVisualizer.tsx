"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import ThreeGlobe from "three-globe";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Étend ThreeGlobe pour React Three Fiber
extend({ ThreeGlobe });

// Type pour les arcs et points
export type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

interface GlobeProps {
  data: Position[];
}

export default function Globe({ data }: GlobeProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [initialized, setInitialized] = useState(false);

  // Initialise le globe
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe({ animateIn: true });
      groupRef.current.add(globeRef.current as unknown as THREE.Object3D);
      setInitialized(true);
    }
  }, []);

  // Configure points et arcs
  useEffect(() => {
    if (!initialized || !globeRef.current) return;

    // Points
    globeRef.current.pointsData(
      data.map((d) => ({
        lat: d.startLat,
        lng: d.startLng,
        color: d.color,
        size: 1,
      }))
    );

    // Arcs
    globeRef.current
      .arcsData(data)
      .arcStartLat((d: object) => (d as Position).startLat)
      .arcStartLng((d: object) => (d as Position).startLng)
      .arcEndLat((d: object) => (d as Position).endLat)
      .arcEndLng((d: object) => (d as Position).endLng)
      .arcAltitude((d: object) => (d as Position).arcAlt)
      .arcColor((d: object) => (d as Position).color)
      .arcDashLength(0.8)
      .arcDashGap(4)
      .arcDashAnimateTime(1000);
  }, [initialized, data]);

  return (
    <Canvas camera={{ position: [0, 0, 300], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 200, 200]} intensity={0.8} />
      <group ref={groupRef} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
}
