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
      {/* Avatar cliquable */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full overflow-hidden border border-white/10 hover:border-green-400/50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        {session.user?.image ? (
          <img
            src={session.user.image}
            alt={session.user.name ?? "User"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-green-500/20 text-green-300 font-semibold text-lg">
            {session.user?.name?.[0] ?? "U"}
          </div>
        )}
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-56 min-h-[20rem] rounded-xl border border-white/10
                     bg-black/90 backdrop-blur-md shadow-2xl overflow-hidden
                     animate-in fade-in slide-in-from-top-2 font-sans"
        >
          {/* Header */}
          <div className="px-6 py-6 border-b border-white/10">
            <p className="text-base font-semibold text-white truncate">
              {session.user?.name}
            </p>
            <p className="text-sm text-gray-300 truncate">
              {session.user?.email}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 p-4">
            <button
              onClick={() => router.push("/dashboard/profile")}
              className="w-full text-left px-6 py-4 text-base text-gray-200
                         rounded-[7px] hover:bg-white/10 flex items-center gap-3 transition-all duration-200"
            >
              <User size={18} /> Mon profil
            </button>

            <button
              onClick={() => router.push("/dashboard/settings")}
              className="w-full text-left px-6 py-4 text-base text-gray-200
                         rounded-[7px] hover:bg-white/10 flex items-center gap-3 transition-all duration-200"
            >
              <Settings size={18} /> Paramètres
            </button>

            <div className="border-t border-white/20 mt-2 pt-2">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left px-6 py-4 text-base text-red-400
                           rounded-[7px] hover:bg-red-500/10 flex items-center gap-3 transition-all duration-200"
              >
                <LogOut size={18} /> Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
