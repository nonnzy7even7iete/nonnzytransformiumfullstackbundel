"use client";

import React, { useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function GlobeInternal({ data }: { data: any[] }) {
  const [globe] = useState(() => new ThreeGlobe());
  const [geoData, setGeoData] = useState<any>(null);
  const [isDark, setIsDark] = useState(false);

  // 1. Détection du thème (Dark/Light)
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme(); // Initial check

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // 2. Chargement des données géo
  useEffect(() => {
    fetch("/globe.json")
      .then((res) => res.json())
      .then((json) => setGeoData(json))
      .catch((err) => console.error("Erreur critique JSON:", err));
  }, []);

  const ringsData = useMemo(() => {
    const source = [
      {
        lat: 5.33,
        lng: -4.03,
        color: isDark ? "#22c55e" : "#16a34a",
        maxR: 5,
        speed: 2,
      },
    ];
    const targets = (data || []).map((d) => ({
      lat: d.endLat,
      lng: d.endLng,
      color: d.color || (isDark ? "#ffffff" : "#000000"),
      maxR: 3,
      speed: 1.5,
    }));
    return [...source, ...targets];
  }, [data, isDark]);

  // 3. Mise à jour dynamique du Globe
  useEffect(() => {
    if (!globe || !geoData) return;

    // Couleurs adaptatives
    const hexColor = isDark
      ? "rgba(34, 197, 94, 0.2)"
      : "rgba(22, 163, 74, 0.15)";
    const atmosphereColor = isDark ? "#22c55e" : "#16a34a";
    const globeColor = isDark ? "#050505" : "#ffffff";

    globe
      .hexPolygonsData(geoData.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.15)
      .hexPolygonColor(() => hexColor)
      .showAtmosphere(true)
      .atmosphereColor(atmosphereColor)
      .atmosphereAltitude(0.15)
      .ringsData(ringsData)
      .ringColor((d: any) => d.color)
      .ringMaxRadius((d: any) => d.maxR)
      .ringPropagationSpeed((d: any) => d.speed)
      .arcsData(data || [])
      .arcColor((d: any) => d.color || atmosphereColor)
      .arcDashLength(0.9)
      .arcDashGap(4)
      .arcDashAnimateTime(4000)
      .arcStroke(0.5);

    const globeMaterial = globe.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color(globeColor);
    globeMaterial.specular = new THREE.Color(isDark ? "#111111" : "#e2e2e2");
    globeMaterial.shininess = isDark ? 0 : 10;
  }, [globe, geoData, ringsData, data, isDark]);

  return <primitive object={globe} />;
}

export default function GlobeClient({ data }: { data: any[] }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ fov: 45, near: 10, far: 2000, position: [0, 0, 320] }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.NoToneMapping,
        }}
      >
        {/* Lumières adaptatives */}
        <ambientLight intensity={1.5} />
        <pointLight position={[320, 320, 320]} intensity={1} />

        <GlobeInternal data={data} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}
