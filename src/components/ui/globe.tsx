"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend, ThreeElement } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "../../data/globe.json";

// Enregistrement du composant pour React Three Fiber
extend({ ThreeGlobe: ThreeGlobe });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      threeGlobe: ThreeElement<typeof ThreeGlobe>;
    }
  }
}

export function Globe({ data }: { data: any[] }) {
  const globeRef = useRef<ThreeGlobe>(null);
  const ABIDJAN = { lat: 5.33, lng: -4.03 };

  // Mémoïsation des données des anneaux (Rings)
  const ringsData = useMemo(() => {
    const source = [
      {
        lat: ABIDJAN.lat,
        lng: ABIDJAN.lng,
        color: "#22c55e",
        maxR: 5,
        speed: 2,
      },
    ];
    const targets = (data || []).map((d) => ({
      lat: d.endLat,
      lng: d.endLng,
      color: d.color || "#ffffff",
      maxR: 3,
      speed: 1.5,
    }));
    return [...source, ...targets];
  }, [data]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    // 1. Géographie
    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.12)
      .hexPolygonColor(() => "rgba(34, 197, 94, 0.12)")
      .showAtmosphere(true)
      .atmosphereColor("#22c55e")
      .atmosphereAltitude(0.15);

    // 2. Matériau (Noir Pur pour unification)
    const globeMaterial = globe.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color("#050505");
    globeMaterial.specular = new THREE.Color("#000000");
    globeMaterial.shininess = 0;

    // 3. Ondes (Rings)
    globe
      .ringsData(ringsData)
      .ringColor((d: any) => d.color)
      .ringMaxRadius((d: any) => d.maxR)
      .ringPropagationSpeed((d: any) => d.speed)
      .ringRepeatPeriod(1000);

    // 4. Arcs de données
    globe
      .arcsData(data || [])
      .arcColor((d: any) => d.color || "#22c55e")
      .arcDashLength(0.9)
      .arcDashGap(4)
      .arcDashAnimateTime(4000)
      .arcStroke(0.5);
  }, [ringsData, data]);

  return <threeGlobe ref={globeRef} />;
}

export function World(props: any) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="absolute inset-0 bg-[#050505]" />;

  return (
    <div className="absolute inset-0 w-full h-full bg-[#050505]">
      <Canvas
        camera={{ fov: 45, near: 10, far: 2000, position: [0, 0, 320] }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.8} color="#ffffff" />
        <pointLight position={[320, 320, 320]} intensity={0.5} />

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
