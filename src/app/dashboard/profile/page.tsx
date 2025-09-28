// src/app/dashboard/profile/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return <ProfileClient session={session} />;
}
