import NavbarFront from "../components/NavbarFront"; // ajuste le chemin si nécessaire

export default function ResumeExecutifPage() {
  return (
    <>
      <NavbarFront /> {/* Navbar affichée en haut */}
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <h1 className="text-4xl font-bold mb-6">Résumé Exécutif</h1>
        <p className="text-gray-700 text-center max-w-xl">
          Cette page est accessible sans authentification.
        </p>
      </main>
    </>
  );
}
