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
    <div className="flex flex-col bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg p-[30px] w-[300px] overflow-hidden">
      <div className="relative w-full h-1/2">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="rounded-xl object-cover"
        />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </div>
  );
}
