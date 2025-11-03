import Image from "next/image";

interface SideCardProps {
  imageSrc: string;
  title: string;
  description: string;
  location?: string; // localisation optionnelle
}

export default function SideCard({
  imageSrc,
  title,
  description,
  location,
}: SideCardProps) {
  return (
    <div className="flex flex-col bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg p-[30px] w-[300px] overflow-hidden text-center">
      <div className="relative w-full h-[200px]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="rounded-xl object-cover"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 items-center">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <p className="text-white/70 text-sm">{description}</p>

        {/* Localisation optionnelle */}
        {location && (
          <p className="text-gray-400 text-xs italic mt-1">{location}</p>
        )}
      </div>
    </div>
  );
}
