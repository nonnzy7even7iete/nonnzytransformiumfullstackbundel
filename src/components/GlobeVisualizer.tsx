"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import ThreeGlobe from "three-globe";
import { OrbitControls } from "@react-three/drei";
import { Color, Vector3 } from "three";

// Étend three-globe pour que React Three Fiber le reconnaisse
extend({ ThreeGlobe });

// Type pour les arcs et points
type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

// Composant Globe autonome
export default function Globe({ data }: { data: Position[] }) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [initialized, setInitialized] = useState(false);

  // Initialise le globe
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe({ animateIn: true });
      (groupRef.current as any).add(globeRef.current);
      setInitialized(true);
    }
  }, []);

  // Configure les arcs et points
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
      .arcStartLat((d) => d.startLat)
      .arcStartLng((d) => d.startLng)
      .arcEndLat((d) => d.endLat)
      .arcEndLng((d) => d.endLng)
      .arcAltitude((d) => d.arcAlt)
      .arcColor((d) => d.color)
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
