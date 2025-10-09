"use client";

interface ShinyTitleProps {
  text: string;
  gradientFrom?: string; // couleur de départ Tailwind (ex: green-700)
  gradientTo?: string; // couleur de fin Tailwind (ex: blue-400)
  className?: string; // classes supplémentaires si besoin
}

export default function ShinyTitle({
  text,
  gradientFrom = "green-700",
  gradientTo = "blue-400",
  className = "",
}: ShinyTitleProps) {
  return (
    <>
      <h2
        className={`relative text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent ${className}`}
        style={{
          backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
          backgroundSize: "200% auto",
          animation: "shine 3s linear infinite",
        }}
      >
        {text}

        {/* Overlay shine */}
        <span className="shine-overlay"></span>
      </h2>

      <style jsx>{`
        h2 {
          --tw-gradient-stops: theme(colors. ${gradientFrom}) 0%,
            theme(colors. ${gradientTo}) 100%;
        }
        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .shine-overlay {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.3);
          opacity: 0;
          pointer-events: none;
          animation: shine-overlay 2.5s ease-in-out infinite;
        }
        @keyframes shine-overlay {
          0% {
            opacity: 0;
            transform: translateX(-100%);
          }
          50% {
            opacity: 0.5;
            transform: translateX(50%);
          }
          100% {
            opacity: 0;
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  );
}
