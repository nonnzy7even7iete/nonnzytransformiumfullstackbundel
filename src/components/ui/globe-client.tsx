"use client";

import React, { useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function GlobeInternal({ data }: { data: any[] }) {
  const [globe] = useState(() => new ThreeGlobe());
  const [geoData, setGeoData] = useState<any>(null); // État pour les données JSON
  const ABIDJAN = { lat: 5.33, lng: -4.03 };

  // Chargement du JSON depuis le dossier public
  useEffect(() => {
    fetch("/globe.json")
      .then((res) => res.json())
      .then((json) => setGeoData(json))
      .catch((err) => console.error("Erreur chargement globe.json:", err));
  }, []);

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
    if (!globe || !geoData) return; // On attend que les données soient là

    globe
      .hexPolygonsData(geoData.features) // Utilisation des données chargées
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.12)
      .hexPolygonColor(() => "rgba(34, 197, 94, 0.12)")
      .showAtmosphere(true)
      .atmosphereColor("#22c55e")
      .atmosphereAltitude(0.15)
      .ringsData(ringsData)
      .ringColor((d: any) => d.color)
      .ringMaxRadius((d: any) => d.maxR)
      .ringPropagationSpeed((d: any) => d.speed)
      .ringRepeatPeriod(1000)
      .arcsData(data || [])
      .arcColor((d: any) => d.color || "#22c55e")
      .arcDashLength(0.9)
      .arcDashGap(4)
      .arcDashAnimateTime(4000)
      .arcStroke(0.5);

    const globeMaterial = globe.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color("#050505");
    globeMaterial.specular = new THREE.Color("#000000");
    globeMaterial.shininess = 0;
  }, [globe, geoData, ringsData, data]);

  return <primitive object={globe} />;
}

export default function GlobeClient({ data }: { data: any[] }) {
  return (
    <Canvas
      camera={{ fov: 45, near: 10, far: 2000, position: [0, 0, 320] }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.8} color="#ffffff" />
      <pointLight position={[320, 320, 320]} intensity={0.5} color="#ffffff" />
      <GlobeInternal data={data} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
