"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend, ThreeElement } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Assure-toi que le chemin vers ton JSON est correct
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

    // 1. APPARENCE DU GLOBE (Look Business Tech)
    const globeMaterial =
      globeRef.current.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color("#05070a");
    globeMaterial.emissive = new THREE.Color("#000000");
    globeMaterial.shininess = 0.8;

    // 2. CONTINENTS (Style Grille Hexagonale)
    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.12)
      .hexPolygonColor(() => "rgba(34, 197, 94, 0.12)")
      .hexPolygonAltitude(0.01);

    // 3. ATMOSPHÈRE
    globeRef.current
      .showAtmosphere(true)
      .atmosphereColor("#22c55e")
      .atmosphereAltitude(0.15);

    // 4. ARCS (Effet Ruban de Fibre Optique longue durée)
    if (data && data.length > 0) {
      globeRef.current
        .arcsData(data)
        .arcStartLat((d: any) => d.startLat)
        .arcStartLng((d: any) => d.startLng)
        .arcEndLat((d: any) => d.endLat)
        .arcEndLng((d: any) => d.endLng)
        .arcColor((d: any) => d.color)
        .arcAltitude((d: any) => d.arcAlt)
        .arcStroke(0.6)
        .arcDashLength(0.95) // 👈 Ligne très longue (quasi tout le trajet)
        .arcDashGap(2) // 👈 Gap réduit pour éviter que ça disparaisse trop vite
        .arcDashInitialGap(1) // 👈 Force l'animation à pousser depuis Abidjan
        .arcDashAnimateTime(6000); // 6 secondes pour un mouvement fluide

      // 5. POINTS (Nodes de connexion)
      globeRef.current
        .pointsData(
          data.flatMap((d) => [
            { lat: d.startLat, lng: d.startLng, color: "#22c55e", size: 1.2 }, // Abidjan (Hub)
            { lat: d.endLat, lng: d.endLng, color: "#ffffff", size: 1.0 }, // Destination (Cible)
          ])
        )
        .pointColor((d: any) => d.color)
        .pointAltitude(0.01)
        .pointRadius((d: any) => d.size);

      // 6. RINGS (Onde de choc de départ d'Abidjan)
      globeRef.current
        .ringsData([
          { lat: data[0].startLat, lng: data[0].startLng, color: "#22c55e" },
        ])
        .ringColor((d: any) => d.color)
        .ringMaxRadius(4)
        .ringPropagationSpeed(1.5)
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

        <ambientLight intensity={1.2} />
        <directionalLight
          position={[-100, 200, 100]}
          intensity={1}
          color="#22c55e"
        />
        <pointLight position={[200, 200, 200]} intensity={1.5} />

        <Globe {...props} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.3} // Rotation lente pour bien suivre les lignes
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
