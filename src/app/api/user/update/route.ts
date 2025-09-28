import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    console.log("📥 [API] Requête reçue sur /api/user/update");

    // ---- Récupérer FormData ----
    const formData = await req.formData();
    const avatar = formData.get("avatar") as File | null;
    const cover = formData.get("cover") as File | null;

    console.log("📂 [API] Fichiers reçus :", {
      avatar: avatar ? avatar.name : null,
      cover: cover ? cover.name : null,
    });

    let avatarUrl: string | undefined;
    let coverUrl: string | undefined;

    // ---- Upload avatar ----
    if (avatar) {
      console.log("⬆️ [API] Upload avatar vers Cloudinary...");
      const bytes = await avatar.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const res = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "avatars" }, (err, result) => {
            if (err) {
              console.error("❌ [API] Erreur Cloudinary avatar :", err);
              return reject(err);
            }
            console.log("✅ [API] Avatar uploadé :", result?.secure_url);
            resolve(result);
          })
          .end(buffer);
      });

      avatarUrl = res.secure_url;
    }

    // ---- Upload cover ----
    if (cover) {
      console.log("⬆️ [API] Upload cover vers Cloudinary...");
      const bytes = await cover.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const res = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "covers" }, (err, result) => {
            if (err) {
              console.error("❌ [API] Erreur Cloudinary cover :", err);
              return reject(err);
            }
            console.log("✅ [API] Cover uploadée :", result?.secure_url);
            resolve(result);
          })
          .end(buffer);
      });

      coverUrl = res.secure_url;
    }

    // ---- Retour ----
    console.log("📦 [API] Réponse renvoyée :", { avatarUrl, coverUrl });
    return NextResponse.json({ success: true, avatarUrl, coverUrl });

  } catch (err) {
    console.error("💥 [API] Erreur globale :", err);
    return NextResponse.json({ error: "Upload échoué" }, { status: 500 });
  }
}
