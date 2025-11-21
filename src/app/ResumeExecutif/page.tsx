import NavbarFront from "@/components/NavbarFront";
import { World, Position } from "@/components/GlobeVisualizer"; // globe fonctionnel

export default function ResumeExecutifPage() {
  const globeData: Position[] = [
    {
      order: 1,
      startLat: 48.8566,
      startLng: 2.3522,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.2,
      color: "#00ff00",
    },
    {
      order: 2,
      startLat: 35.6895,
      startLng: 139.6917,
      endLat: 51.5074,
      endLng: -0.1278,
      arcAlt: 0.3,
      color: "#00ffff",
    },
  ];

  return (
    <>
      <NavbarFront />
      <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
        <h1 className="text-4xl font-bold mb-6">Résumé Exécutif</h1>
        <p className="text-gray-300 text-center max-w-xl mb-8">
          Cette page est accessible sans authentification.
        </p>
        <div className="w-full max-w-7xl h-[500px]">
          <World data={globeData} />
        </div>
      </main>
    </>
  );
}
