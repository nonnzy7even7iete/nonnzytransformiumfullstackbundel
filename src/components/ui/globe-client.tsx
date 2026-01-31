"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface GlobeProps {
  data: any[];
}

function GlobeInternal({ data }: GlobeProps) {
  const globeRef = useRef<ThreeGlobe>(new ThreeGlobe());
  const [geoData, setGeoData] = useState<any>(null);
  const [isDark, setIsDark] = useState(false);

  // Détection du thème
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

  useEffect(() => {
    fetch("/globe.json")
      .then((res) => res.json())
      .then((json) => setGeoData(json))
      .catch((err) => console.error("Globe JSON Error:", err));
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !geoData) return;

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

    // FIX ERREUR VS CODE : Cast explicite du matériau
    const globeMaterial = globe.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color(globeColor);
    globeMaterial.emissive = new THREE.Color(isDark ? "#000000" : "#f0f0f0");
    globeMaterial.emissiveIntensity = isDark ? 0 : 0.1;
    globeMaterial.shininess = isDark ? 0 : 20;
  }, [geoData, data, isDark]);

  return <primitive object={globeRef.current} />;
}

export default function Globe({ data }: GlobeProps) {
  // On déplace la logique de détection ici aussi pour les lumières du Canvas
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-full bg-transparent">
      <Canvas
        camera={{ fov: 45, near: 10, far: 2000, position: [0, 0, 320] }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {/* FIX ERREUR VS CODE : isDark est maintenant défini dans ce scope */}
        <ambientLight intensity={isDark ? 0.7 : 1.5} />
        <pointLight position={[300, 300, 300]} intensity={isDark ? 0.5 : 1.2} />

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
