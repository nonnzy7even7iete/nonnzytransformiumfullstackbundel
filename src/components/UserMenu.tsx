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
    <div
      className="relative flex items-center border-b"
      style={{ borderImage: "linear-gradient(to right, #047857, #9ca3af) 1" }}
    >
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
          className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10
                        bg-black/90 backdrop-blur-md shadow-xl overflow-hidden
                        animate-in fade-in slide-in-from-top-2"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 pl-6">
            <p className="text-sm font-semibold text-white truncate">
              {session.user?.name}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {session.user?.email}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-1 px-2 py-1">
            <button
              onClick={() => router.push("/dashboard/profile")}
              className="w-full text-left px-4 py-3 pl-6 text-sm text-gray-300
                         transition-colors rounded-[7px] hover:bg-white/10 flex items-center gap-3"
            >
              <User size={16} /> Mon profil
            </button>

            <button
              onClick={() => router.push("/dashboard/settings")}
              className="w-full text-left px-4 py-3 pl-6 text-sm text-gray-300
                         transition-colors rounded-[7px] hover:bg-white/10 flex items-center gap-3"
            >
              <Settings size={16} /> Paramètres
            </button>

            <div className="border-t border-white/10 mt-1 pt-1">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left px-4 py-3 pl-6 text-sm text-red-400
                           transition-colors rounded-[7px] hover:bg-red-500/10 flex items-center gap-3"
              >
                <LogOut size={16} /> Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
