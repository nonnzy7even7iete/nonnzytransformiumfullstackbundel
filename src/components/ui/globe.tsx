"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend, ThreeElement } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Assure-toi que ce chemin est correct dans ton projet
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

    // 1. LOOK BUSINESS : Globe ultra sombre, presque mat
    const globeMaterial =
      globeRef.current.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color("#05070a");
    globeMaterial.emissive = new THREE.Color("#000000");
    globeMaterial.shininess = 0.8;

    // 2. CONTINENTS "TECH" : On utilise un style digital (hexagones fins)
    // On laisse un minuscule margin pour créer un effet de grille technologique
    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.12)
      .hexPolygonColor(() => "rgba(34, 197, 94, 0.12)")
      .hexPolygonAltitude(0.005);

    // 3. ATMOSPHÈRE SÉRIEUSE
    globeRef.current
      .showAtmosphere(true)
      .atmosphereColor("#166534") // Vert émeraude profond
      .atmosphereAltitude(0.15);

    // 4. ARCS "NETWORKING" (Fibre optique ultra-fine)
    if (data) {
      globeRef.current
        .arcsData(data)
        .arcStartLat((d: any) => d.startLat)
        .arcStartLng((d: any) => d.startLng)
        .arcEndLat((d: any) => d.endLat)
        .arcEndLng((d: any) => d.endLng)
        .arcColor((d: any) => d.color)
        .arcAltitude((d: any) => d.arcAlt)
        .arcStroke(0.3) // Plus fin = plus tech
        .arcDashLength(0.2) // Trait plus court pour l'effet "impulsion"
        .arcDashGap(10) // Plus d'espace pour un look aéré
        .arcDashAnimateTime(4000); // 4 secondes pour un voyage majestueux

      // 5. NODES (Points de connexion avec anneaux)
      globeRef.current
        .pointsData(
          data.flatMap((d) => [
            { lat: d.startLat, lng: d.startLng, color: "#22c55e", size: 0.8 },
            { lat: d.endLat, lng: d.endLng, color: "#ffffff", size: 0.5 },
          ])
        )
        .pointColor((d: any) => d.color)
        .pointAltitude(0.01)
        .pointRadius((d: any) => d.size);

      // Effet d'anneau de pulsation (Rings)
      globeRef.current
        .ringsData(
          data.flatMap((d) => [
            { lat: d.startLat, lng: d.startLng, color: "#22c55e" },
          ])
        )
        .ringColor((d: any) => d.color)
        .ringMaxRadius(3)
        .ringPropagationSpeed(2)
        .ringRepeatPeriod(2000);
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

        {/* Éclairage directionnel pour créer du relief sur la courbure du globe */}
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[-100, 200, 100]}
          intensity={1.5}
          color="#166534"
        />
        <pointLight position={[200, 200, 200]} intensity={1.5} />

        <Globe {...props} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.4} // Légèrement ralenti pour plus de classe
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
