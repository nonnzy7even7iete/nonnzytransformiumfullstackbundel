import Image from "next/image";

interface SideCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

export default function SideCard({
  imageSrc,
  title,
  description,
}: SideCardProps) {
  return (
    <div className="flex flex-col bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg w-[300px] overflow-hidden">
      {/* Image container avec hauteur fixée */}
      <div className="relative w-full h-[200px]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-center rounded-t-2xl"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Contenu texte */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </div>
  );
}
