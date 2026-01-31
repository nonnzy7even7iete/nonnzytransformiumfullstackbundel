"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function GlobeInternal({ data }: { data: any[] }) {
  const globeRef = useRef<ThreeGlobe>(new ThreeGlobe());
  const [geoData, setGeoData] = useState<any>(null);
  const [isDark, setIsDark] = useState(false);

  // Détection dynamique du mode Dark/Light
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Chargement des données géo
  useEffect(() => {
    fetch("/globe.json")
      .then((res) => res.json())
      .then((json) => setGeoData(json));
  }, []);

  // Mise à jour du Globe quand le thème ou les données changent
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !geoData) return;

    // Couleurs adaptatives
    const hexColor = isDark
      ? "rgba(34, 197, 94, 0.2)"
      : "rgba(16, 185, 129, 0.15)";
    const globeColor = isDark ? "#050505" : "#ffffff";
    const atmosphereColor = isDark ? "#22c55e" : "#10b981";

    globe
      .hexPolygonsData(geoData.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.15)
      .hexPolygonColor(() => hexColor)
      .showAtmosphere(true)
      .atmosphereColor(atmosphereColor)
      .atmosphereAltitude(0.2)
      .arcsData(data || [])
      .arcColor((d: any) => d.color || atmosphereColor)
      .arcDashLength(0.9)
      .arcDashGap(4)
      .arcDashAnimateTime(4000)
      .arcStroke(0.5);

    // Update du matériel pour éviter le "bloc noir"
    const globeMaterial = globe.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color(globeColor);
    globeMaterial.emissive = new THREE.Color(isDark ? "#000000" : "#f0f0f0");
    globeMaterial.emissiveIntensity = isDark ? 0 : 0.1;
    globeMaterial.shininess = isDark ? 0 : 20;
  }, [geoData, data, isDark]);

  return <primitive object={globeRef.current} />;
}

export default function Globe({ data }: { data: any[] }) {
  return (
    <div className="w-full h-full bg-transparent">
      <Canvas
        camera={{ fov: 45, near: 10, far: 2000, position: [0, 0, 320] }}
        gl={{
          antialias: true,
          alpha: true, // Crucial pour laisser passer le fond blanc
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={isDark ? 0.5 : 2.5} />
        <pointLight position={[300, 300, 300]} intensity={isDark ? 0.5 : 2} />
        <GlobeInternal data={data} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.7}
        />
      </Canvas>
    </div>
  );
}
