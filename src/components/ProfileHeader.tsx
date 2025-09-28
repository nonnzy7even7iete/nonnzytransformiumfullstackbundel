"use client";

import { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { useDropzone } from "react-dropzone";

interface ProfileHeaderProps {
  avatarUrl?: string; // URL de l’avatar actuel (venant du parent, ex: backend)
  coverUrl?: string;  // URL de la cover actuelle (pareil)
  onUpload: (avatar?: File, cover?: File) => Promise<void>; // callback pour envoyer les fichiers
  onSignOut: () => void; // callback pour se déconnecter
}

export default function ProfileHeader({
  avatarUrl,
  coverUrl,
  onUpload,
  onSignOut,
}: ProfileHeaderProps) {
  // ---- STATES LOCAUX ----
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // fichier avatar sélectionné
  const [coverFile, setCoverFile] = useState<File | null>(null);   // fichier cover sélectionné
  const [avatarPreview, setAvatarPreview] = useState<string>(avatarUrl || "/default-avatar.png"); 
  const [coverPreview, setCoverPreview] = useState<string>(coverUrl || "/default-cover.png");
  const [loading, setLoading] = useState(false); // état du bouton pendant l’upload

  // ---- 1. SYNC AVEC LES PROPS ----
  // Si le parent change l’avatar/cover (ex: après upload réussi), on met à jour la preview locale.
  useEffect(() => {
    if (avatarUrl) setAvatarPreview(avatarUrl);
  }, [avatarUrl]);

  useEffect(() => {
    if (coverUrl) setCoverPreview(coverUrl);
  }, [coverUrl]);

  // ---- 2. LIBÉRER LES URLs BLOB ----
  // Quand on change de fichier, on génère une preview avec URL.createObjectURL.
  // Mais il faut "revoke" l’ancienne pour éviter les fuites mémoire.
  useEffect(() => {
    return () => {
      if (avatarPreview?.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
      if (coverPreview?.startsWith("blob:")) URL.revokeObjectURL(coverPreview);
    };
  }, [avatarPreview, coverPreview]);

  // ---- 3. DROPZONE AVATAR ----
  const handleDropAvatar = (files: File[]) => {
    if (!files[0]) return;
    setAvatarFile(files[0]); // on garde le fichier
    setAvatarPreview(URL.createObjectURL(files[0])); // on génère la preview
  };

  const {
    getRootProps: getAvatarRoot,
    getInputProps: getAvatarInput,
    isDragActive: isAvatarDrag,
  } = useDropzone({
    onDrop: handleDropAvatar,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  // ---- 4. DROPZONE COVER ----
  const handleDropCover = (files: File[]) => {
    if (!files[0]) return;
    setCoverFile(files[0]);
    setCoverPreview(URL.createObjectURL(files[0]));
  };

  const {
    getRootProps: getCoverRoot,
    getInputProps: getCoverInput,
    isDragActive: isCoverDrag,
  } = useDropzone({
    onDrop: handleDropCover,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  // ---- 5. UPLOAD ----
  const handleUploadClick = async () => {
    if (!avatarFile && !coverFile) return; // sécurité : rien à uploader
    try {
      setLoading(true);
      // envoie au parent → c’est lui qui gère l’API
      await onUpload(avatarFile || undefined, coverFile || undefined);
    } catch (err) {
      console.error(err);
      alert("❌ Échec de l’upload, réessaie !");
    } finally {
      // reset local
      setAvatarFile(null);
      setCoverFile(null);
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl border border-white/10">
      
      {/* ---- COVER ---- */}
      <div className="relative h-64 bg-gray-700">
        <img
          src={coverPreview}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div
          {...getCoverRoot()}
          // Petit feedback visuel si on drag un fichier
          className={`absolute inset-0 flex items-center justify-center 
          ${isCoverDrag ? "bg-blue-500/40" : "bg-black/40"} 
          opacity-0 hover:opacity-100 cursor-pointer transition-opacity`}
        >
          <input {...getCoverInput()} />
          <FiUpload className="text-white text-3xl" />
        </div>
      </div>

      {/* ---- AVATAR + ACTIONS ---- */}
      <div className="relative px-6 -mt-16 flex flex-col items-center">
        <div {...getAvatarRoot()} className="relative group cursor-pointer">
          <input {...getAvatarInput()} />
          <img
            src={avatarPreview}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
          {/* Overlay quand on survole ou drag */}
          <div
            className={`absolute inset-0 rounded-full flex items-center justify-center
            ${isAvatarDrag ? "bg-blue-500/50" : "bg-black/40"}
            opacity-0 group-hover:opacity-100 transition-opacity`}
          >
            <FiUpload className="text-white text-2xl" />
          </div>
        </div>

        {/* ---- BOUTONS ---- */}
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleUploadClick}
            disabled={loading || (!avatarFile && !coverFile)}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all disabled:opacity-50 backdrop-blur-md"
            aria-label="Mettre à jour l’image de profil"
          >
            {loading ? "Mise à jour..." : "Mettre à jour"}
          </button>
          <button
            onClick={onSignOut}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all"
            aria-label="Se déconnecter"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
