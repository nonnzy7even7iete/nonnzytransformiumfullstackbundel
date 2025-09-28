"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileContent from "@/components/ProfileContent";

export default function ProfileClient({ session }: { session: any }) {
  const [avatarUrl, setAvatarUrl] = useState(session.user.image || "");
  const [coverUrl, setCoverUrl] = useState(session.user.cover || "");

  const handleUpload = async (avatar?: File, cover?: File) => {
    const formData = new FormData();
    if (avatar) formData.append("avatar", avatar);
    if (cover) formData.append("cover", cover);
    const res = await fetch("/api/user/update", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) return alert("Upload échoué");
    const data = await res.json();
    if (data.avatarUrl) setAvatarUrl(data.avatarUrl);
    if (data.coverUrl) setCoverUrl(data.coverUrl);
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-6">
      <ProfileHeader
        avatarUrl={avatarUrl}
        coverUrl={coverUrl}
        onUpload={handleUpload}
        onSignOut={() => signOut({ callbackUrl: "/" })}
      />
      <ProfileContent />
    </main>
  );
}
