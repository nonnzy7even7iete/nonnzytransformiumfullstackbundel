"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend, ThreeElement } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Assure-toi que ce chemin est correct
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

interface WorldProps {
  globeConfig: any;
  data: Position[];
}

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [isInitialized, setIsInitialized] = useState(false);

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

    // 1. MATÉRIAU DU GLOBE : On le force en bleu-noir très sombre
    const globeMaterial =
      globeRef.current.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color("#020617");
    globeMaterial.emissive = new THREE.Color("#000000");
    globeMaterial.shininess = 0.5;

    // 2. CONTINENTS : On utilise une résolution plus haute et PAS DE MARGE pour qu'ils soient pleins
    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0) // 0 = Continents pleins et visibles
      .hexPolygonColor(() => "rgba(34, 197, 94, 0.2)") // Vert transparent mais visible
      .hexPolygonAltitude(0.005); // Légèrement surélevé pour être sûr qu'on les voit

    // 3. ATMOSPHÈRE
    globeRef.current
      .showAtmosphere(true)
      .atmosphereColor("#22c55e")
      .atmosphereAltitude(0.1);

    // 4. ARCS (Fils de lumière)
    if (data) {
      globeRef.current
        .arcsData(data)
        .arcStartLat((d: any) => d.startLat)
        .arcStartLng((d: any) => d.startLng)
        .arcEndLat((d: any) => d.endLat)
        .arcEndLng((d: any) => d.endLng)
        .arcColor((d: any) => d.color)
        .arcAltitude((d: any) => d.arcAlt)
        .arcStroke(0.5)
        .arcDashLength(0.4)
        .arcDashGap(4)
        .arcDashAnimateTime(2000);

      // Points sur Abidjan et destination
      globeRef.current
        .pointsData(
          data.flatMap((d) => [
            { lat: d.startLat, lng: d.startLng, color: "#22c55e" },
            { lat: d.endLat, lng: d.endLng, color: "#ffffff" },
          ])
        )
        .pointColor((d: any) => d.color)
        .pointRadius(0.8);
    }
  }, [isInitialized, data]);

  return <group ref={groupRef} />;
}

export function World(props: WorldProps) {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute" }}>
      <Canvas
        camera={{ fov: 45, near: 10, far: 2000, position: [0, 0, cameraZ] }}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={1.5} />{" "}
        {/* Augmentation de la lumière pour voir les continents */}
        <pointLight position={[200, 200, 200]} intensity={2} />
        <Globe {...props} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
