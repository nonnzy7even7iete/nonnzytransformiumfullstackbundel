"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut } from "lucide-react";

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (!session) return null;

  return (
    <div className="relative font-sans">
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full overflow-hidden border border-white/20 
                   hover:border-gray-400/60 transition-colors focus:outline-none 
                   focus:ring-2 focus:ring-gray-400"
      >
        {session.user?.image ? (
          <img
            src={session.user.image}
            alt={session.user.name ?? "User"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-gray-700/20 
                          text-green-300 font-bold text-xl"
          >
            {session.user?.name?.[0] ?? "U"}
          </div>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-60 min-h-[22rem] rounded-xl border border-white/20
                     bg-black/90 backdrop-blur-lg shadow-2xl overflow-hidden flex flex-col z-50"
        >
          {/* Header */}
          <div className="px-6 py-6 border-b border-white/20 flex flex-col items-center justify-center text-center">
            <p className="text-lg font-semibold text-white truncate">
              {session.user?.name}
            </p>
            <p className="text-sm text-gray-300 truncate mt-1">
              {session.user?.email}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 p-4 flex-1 justify-center">
            {[
              {
                label: "Mon profil",
                icon: <User size={20} />,
                action: () => router.push("/dashboard/profile"),
              },
              {
                label: "Paramètres",
                icon: <Settings size={20} />,
                action: () => router.push("/dashboard/settings"),
              },
              {
                label: "Se déconnecter",
                icon: <LogOut size={20} />,
                action: () => signOut({ callbackUrl: "/" }),
                color: "text-red-400",
                hover: "hover:bg-red-500/10",
              },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className={`w-full flex items-center justify-center text-base ${
                  item.color ?? "text-gray-200"
                } transition-all duration-200`}
              >
                <span
                  className={`flex items-center gap-2 rounded-[7px] px-[14px] py-[7px] ${
                    item.hover ?? "hover:bg-white/10"
                  } hover:-translate-y-[2px] transition-all duration-200`}
                >
                  {item.icon} <span>{item.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
