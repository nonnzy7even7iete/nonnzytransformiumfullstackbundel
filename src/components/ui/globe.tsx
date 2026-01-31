"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend, ThreeElement } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "next-themes";
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
let sharedGlobeInstance: ThreeGlobe | null = null;

export function Globe({ data }: { data: any[] }) {
  const groupRef = useRef<THREE.Group>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Configuration Abidjan
  const ABIDJAN = { lat: 5.33, lng: -4.03 };

  const colors = useMemo(
    () => ({
      globe: isDark ? "#050505" : "#f8fafc",
      land: isDark ? "rgba(34, 197, 94, 0.12)" : "rgba(34, 197, 94, 0.3)",
      atmosphere: isDark ? "#22c55e" : "#16a34a",
      arcDefault: "#22c55e",
    }),
    [isDark]
  );

  // Logique des Rings (Ondes) : Abidjan (Source) + Destinations (Cibles)
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

    const targets = data.map((d) => ({
      lat: d.endLat,
      lng: d.endLng,
      color: d.color || "#ffffff",
      maxR: 3,
      speed: 1.5,
    }));

    return [...source, ...targets];
  }, [data]);

  useEffect(() => {
    if (!groupRef.current) return;
    if (!sharedGlobeInstance) sharedGlobeInstance = new ThreeGlobe();

    const globe = sharedGlobeInstance;
    groupRef.current.add(globe);

    // 1. Géographie et Atmosphère
    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.12)
      .hexPolygonColor(() => colors.land)
      .showAtmosphere(true)
      .atmosphereColor(colors.atmosphere)
      .atmosphereAltitude(isDark ? 0.15 : 0.08);

    // 2. Ondes Pulsantes (Rings)
    globe
      .ringsData(ringsData)
      .ringColor((d: any) => d.color)
      .ringMaxRadius((d: any) => d.maxR)
      .ringPropagationSpeed((d: any) => d.speed)
      .ringRepeatPeriod(1000);

    // 3. Matériau du Globe (Noir Pur)
    const globeMaterial = globe.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color(colors.globe);
    globeMaterial.specular = new THREE.Color("#000000");
    globeMaterial.shininess = 0;

    return () => {
      if (groupRef.current) groupRef.current.remove(globe);
    };
  }, [colors, isDark, ringsData]);

  // 4. Arcs de données
  useEffect(() => {
    if (!sharedGlobeInstance || !data) return;
    sharedGlobeInstance
      .arcsData(data)
      .arcColor((d: any) => d.color || colors.arcDefault)
      .arcDashLength(0.9)
      .arcDashGap(4)
      .arcDashAnimateTime(4000)
      .arcStroke(0.5);
  }, [data, colors.arcDefault]);

  return <group ref={groupRef} />;
}

export function World(props: any) {
  const { resolvedTheme } = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) return null;

  return (
    <div className="absolute inset-0 w-full h-full bg-[#050505]">
      <Canvas
        camera={{ fov: 45, near: 10, far: 2000, position: [0, 0, cameraZ] }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight
          intensity={resolvedTheme === "dark" ? 0.8 : 2.0}
          color="#ffffff"
        />
        <pointLight
          position={[cameraZ, cameraZ, cameraZ]}
          intensity={0.5}
          color="#ffffff"
        />
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
