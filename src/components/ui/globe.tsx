"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend, ThreeElement } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

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

    // MATÉRIAU : Noir profond
    const globeMaterial =
      globeRef.current.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color("#05070a");
    globeMaterial.emissive = new THREE.Color("#000000");

    // CONTINENTS : Look "Grille" Tech
    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.12)
      .hexPolygonColor(() => "rgba(34, 197, 94, 0.15)")
      .hexPolygonAltitude(0.01);

    // ATMOSPHÈRE : Douce
    globeRef.current
      .showAtmosphere(true)
      .atmosphereColor("#22c55e")
      .atmosphereAltitude(0.12);

    // ARCS : LE MOUVEMENT CALME
    if (data) {
      globeRef.current
        .arcsData(data)
        .arcStartLat((d: any) => d.startLat)
        .arcStartLng((d: any) => d.startLng)
        .arcEndLat((d: any) => d.endLat)
        .arcEndLng((d: any) => d.endLng)
        .arcColor((d: any) => d.color)
        .arcAltitude((d: any) => d.arcAlt + 0.1) // 👈 Un peu plus de hauteur pour voir la parabole
        .arcStroke(0.4)
        .arcDashLength(0.5) // 👈 Longueur de la traînée
        .arcDashGap(15) // 👈 Très grand gap pour qu'on voie la ligne "partir" et "arriver" sans encombrement
        .arcDashAnimateTime(6000); // 👈 6 secondes : très lent et majestueux

      // POINTS ET PULSATIONS
      globeRef.current
        .pointsData(
          data.flatMap((d) => [
            { lat: d.startLat, lng: d.startLng, color: "#22c55e", size: 0.9 },
            { lat: d.endLat, lng: d.endLng, color: "#ffffff", size: 0.6 },
          ])
        )
        .pointColor((d: any) => d.color)
        .pointRadius((d: any) => d.size);

      globeRef.current
        .ringsData(
          data.flatMap((d) => [
            { lat: d.startLat, lng: d.startLng, color: "#22c55e" },
          ])
        )
        .ringColor((d: any) => d.color)
        .ringMaxRadius(2.5)
        .ringPropagationSpeed(1) // 👈 Onde de choc lente
        .ringRepeatPeriod(2500);
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
        <ambientLight intensity={1.5} />
        <directionalLight
          position={[-100, 200, 100]}
          intensity={1}
          color="#22c55e"
        />
        <Globe {...props} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.3} // 👈 Rotation du globe ralentie pour ne pas perdre la ligne de vue
        />
      </Canvas>
    </div>
  );
}
