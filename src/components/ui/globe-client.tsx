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
    const color = isDark ? "#22c55e" : "#10b981";
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
  }, [data, isDark]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !geoData) return;

    globe
      .hexPolygonsData(geoData.features)
      .hexPolygonColor(() =>
        isDark ? "rgba(34, 197, 94, 0.2)" : "rgba(16, 185, 129, 0.2)"
      )
      .showAtmosphere(true)
      .atmosphereColor(isDark ? "#22c55e" : "#10b981")
      .atmosphereAltitude(0.2)
      .ringsData(ringsData)
      .ringColor((d: any) => d.color)
      .arcsData(data)
      .arcColor((d: any) => d.color)
      .arcDashAnimateTime(4000);

    const mat = globe.globeMaterial() as THREE.MeshPhongMaterial;
    mat.color = new THREE.Color(isDark ? "#050505" : "#ffffff");
    mat.shininess = isDark ? 0 : 25;
  }, [geoData, data, ringsData, isDark]);

  return (
    <Canvas
      camera={{ position: [0, 0, 320], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={isDark ? 0.7 : 2.5} />
      <pointLight position={[300, 300, 300]} intensity={isDark ? 0.5 : 2} />
      <primitive object={globeRef.current} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
