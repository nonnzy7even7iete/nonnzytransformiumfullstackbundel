"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function GlobeClient({ data }: { data: any[] }) {
  const globeRef = useRef<ThreeGlobe>(new ThreeGlobe());
  const [geoData, setGeoData] = useState<any>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    fetch("/globe.json")
      .then((res) => res.json())
      .then(setGeoData);
  }, []);

  const ringsData = useMemo(() => {
    const color = "#10b981"; // Vert Émeraude pur
    return [
      { lat: 5.33, lng: -4.03, color, maxR: 5, speed: 2 },
      ...(data || []).map((d) => ({
        lat: d.endLat,
        lng: d.endLng,
        color: d.color,
        maxR: 3,
        speed: 1.5,
      })),
    ];
  }, [data]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !geoData) return;

    globe
      .hexPolygonsData(geoData.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.12)
      .hexPolygonColor(() =>
        isDark ? "rgba(34, 197, 94, 0.4)" : "rgba(16, 185, 129, 0.7)"
      ) // Vert saturé
      .showAtmosphere(true)
      .atmosphereColor("#10b981")
      .atmosphereAltitude(isDark ? 0.2 : 0.1)
      .ringsData(ringsData)
      .ringColor((d: any) => d.color)
      .arcsData(data)
      .arcColor((d: any) => d.color)
      .arcStroke(0.5)
      .arcDashAnimateTime(4000);

    const mat = globe.globeMaterial() as THREE.MeshPhongMaterial;
    mat.color = new THREE.Color(isDark ? "#050505" : "#ffffff");
    mat.emissive = new THREE.Color(isDark ? "#000000" : "#f0fff4"); // Lueur interne pour le peps
    mat.shininess = 100;
  }, [geoData, data, ringsData, isDark]);

  return (
    <Canvas
      camera={{ position: [0, 0, 320], fov: 45 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.NoToneMapping }}
    >
      <ambientLight intensity={isDark ? 0.7 : 1.5} />
      <pointLight position={[400, 400, 400]} intensity={isDark ? 1 : 2.5} />
      <primitive object={globeRef.current} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
