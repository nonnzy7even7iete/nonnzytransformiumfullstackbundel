"use client";

import { GrAppsRounded } from "react-icons/gr";
import { LuChartNoAxesCombined } from "react-icons/lu"; // 🔹 nouvelle icône pour Awards
import { TbWorldCode } from "react-icons/tb"; // 🔹 nouvelle icône pour Étudiants
import { Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { icon: GrAppsRounded, href: "/dashboard", label: "Zy App" },
  {
    icon: LuChartNoAxesCombined,
    href: "/dashboard/awards",
    label: "Statistiques",
  }, // label mis à jour
  { icon: TbWorldCode, href: "/dashboard/students", label: "Codeurs" }, // label mis à jour
  { icon: Settings, href: "/dashboard/settings", label: "Paramètres" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav
      className={`
        fixed bg-black/30 backdrop-blur-md
        md:top-0 md:left-0 md:h-screen md:w-20 md:flex-col md:border-r md:border-white/10
        bottom-0 w-full h-16 flex flex-row justify-around items-center
        transition-all z-50
      `}
    >
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <button
            key={idx}
            onClick={() => router.push(item.href)}
            className={`
              flex flex-col md:flex-col items-center justify-center gap-1
              text-white/70 hover:text-green-400 transition-colors
              ${
                isActive ? "text-green-700 bg-white/5 rounded-lg px-2 py-1" : ""
              }
            `}
          >
            {/* ⚡️ gestion spéciale pour react-icons */}
            {item.href === "/dashboard" ? (
              <Icon className="text-xl" />
            ) : (
              <Icon size={24} />
            )}
            <span className="text-xs md:block hidden">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
