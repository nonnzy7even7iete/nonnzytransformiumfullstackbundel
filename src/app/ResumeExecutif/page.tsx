import NavbarFront from "@/components/NavbarFront";

export default function ResumeExecutifPage() {
  return (
    <>
      <NavbarFront /> {/* Navbar affichée en haut */}
      <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
        <h1 className="text-4xl font-bold mb-6 text-green-400">
          Résumé Exécutif
        </h1>
        <p className="text-gray-300 text-center max-w-xl mb-8">
          En courss de redaction{" "}
        </p>
      </main>
    </>
  );
}
