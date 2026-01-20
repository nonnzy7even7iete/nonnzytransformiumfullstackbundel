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

    // MATÉRIAU : Fond très sombre pour faire ressortir le vert
    const globeMaterial =
      globeRef.current.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color("#05070a");
    globeMaterial.emissive = new THREE.Color("#000000");

    // CONTINENTS : Look digital discret
    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.12)
      .hexPolygonColor(() => "rgba(34, 197, 94, 0.1)")
      .hexPolygonAltitude(0.01);

    // ATMOSPHÈRE : Vert technologique
    globeRef.current
      .showAtmosphere(true)
      .atmosphereColor("#22c55e")
      .atmosphereAltitude(0.15);

    // GESTION DES ARCS - EFFET DE DÉPART D'ABIDJAN
    if (data && data.length > 0) {
      globeRef.current
        .arcsData(data)
        .arcStartLat((d: any) => d.startLat)
        .arcStartLng((d: any) => d.startLng)
        .arcEndLat((d: any) => d.endLat)
        .arcEndLng((d: any) => d.endLng)
        .arcColor((d: any) => d.color)
        .arcAltitude((d: any) => d.arcAlt)
        .arcStroke(0.6) // Un peu plus épais pour bien voir le flux
        .arcDashLength(0.4) // Longueur du segment
        .arcDashGap(2) // Espace entre les segments
        .arcDashInitialGap(1) // 👈 FORCE LE DÉPART (La ligne commence "cachée" et sort)
        .arcDashAnimateTime(globeConfig.arcTime || 6000);

      // Points de repère fixes
      globeRef.current
        .pointsData(
          data.flatMap((d) => [
            { lat: d.startLat, lng: d.startLng, color: "#22c55e", size: 1.2 }, // Abidjan plus gros
            { lat: d.endLat, lng: d.endLng, color: "#ffffff", size: 0.8 },
          ])
        )
        .pointColor((d: any) => d.color)
        .pointRadius((d: any) => d.size);

      // Onde de choc à Abidjan pour signaler le départ
      globeRef.current
        .ringsData([
          { lat: data[0].startLat, lng: data[0].startLng, color: "#22c55e" },
        ])
        .ringColor((d: any) => d.color)
        .ringMaxRadius(4)
        .ringPropagationSpeed(2)
        .ringRepeatPeriod(1500);
    }
  }, [isInitialized, data, globeConfig]);

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
        <pointLight position={[200, 200, 200]} intensity={1.5} />

        <Globe {...props} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
}
