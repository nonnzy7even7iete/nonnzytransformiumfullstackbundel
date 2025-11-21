"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import ThreeGlobe from "three-globe";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json"; // Assure-toi que ce fichier existe

extend({ ThreeGlobe });

// ---------------- TypeScript ----------------
export type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

const cameraZ = 300;
const aspect = 1.2;

// ---------------- Composant Globe ----------------
export function Globe({
  globeConfig,
  data,
}: {
  globeConfig: GlobeConfig;
  data: Position[];
}) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<THREE.Group>();
  const [isInitialized, setIsInitialized] = useState(false);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  // Initialisation du globe
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      groupRef.current.add(globeRef.current);
      setIsInitialized(true);
    }
  }, []);

  // Configuration du matériau
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;
    const mat = globeRef.current.globeMaterial() as any;
    mat.color = new Color(defaultProps.globeColor);
    mat.emissive = new Color(defaultProps.emissive);
    mat.emissiveIntensity = defaultProps.emissiveIntensity;
    mat.shininess = defaultProps.shininess;
  }, [isInitialized]);

  // Configuration des arcs et points
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const points: any[] = [];
    data.forEach((arc) => {
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    });

    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) => v2.lat === v.lat && v2.lng === v.lng) === i
    );

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => d.startLat)
      .arcStartLng((d) => d.startLng)
      .arcEndLat((d) => d.endLat)
      .arcEndLng((d) => d.endLng)
      .arcColor((e) => e.color)
      .arcAltitude((e) => e.arcAlt)
      .arcDashLength(defaultProps.arcLength)
      .arcDashAnimateTime(defaultProps.arcTime)
      .arcDashGap(15);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e) => e.color)
      .pointsMerge(true)
      .pointAltitude(0)
      .pointRadius(defaultProps.pointSize);
  }, [isInitialized, data]);

  return <group ref={groupRef} />;
}

// ---------------- Canvas du Globe ----------------
export function World({
  globeConfig,
  data,
}: {
  globeConfig: GlobeConfig;
  data: Position[];
}) {
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);

  return (
    <Canvas
      scene={scene}
      camera={new PerspectiveCamera(50, aspect, 180, 1800)}
      style={{ width: "100%", height: "500px" }}
    >
      <ambientLight
        color={globeConfig.ambientLight || "#888888"}
        intensity={0.6}
      />
      <directionalLight
        color={globeConfig.directionalLeftLight || "#ffffff"}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight || "#ffffff"}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight || "#ffffff"}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe globeConfig={globeConfig} data={data} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={globeConfig.autoRotate ?? true}
        autoRotateSpeed={globeConfig.autoRotateSpeed ?? 0.2}
      />
    </Canvas>
  );
}
