"use client"

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { useUploadThing } from "@/utils/uploadthing";

export default function CustomUploader({setImage}: {setImage: (imageUrl: string) => void}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // 1. Initialize the hook with your endpoint
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      setIsUploading(false);
      const url = res[0].url;
        setImage(url);
      console.log("Upload complete! URL:", url);
      // Here is where you'd call your AI analyze function:
      // analyzeIngredientsOpenSource(query, url, settings);
    },
    onUploadError: (error) => {
      setIsUploading(false);
      alert(`Upload failed: ${error.message}`);
    },
    onUploadBegin: () => {
      setIsUploading(true);
    }
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 2. Trigger the upload manually
    await startUpload([file]);
  };

  return (
    <div className="flex flex-col items-center gap-4 cursor-pointer">
      {/* Hidden native input */}
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*, android/force-camera-workaround"
      />

      {/* YOUR CUSTOM BUTTON */}
      <button
        type="button"
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 bg-neutral-100 text-neutral-900 px-6 py-3 rounded-2xl font-medium hover:bg-neutral-200 border border-neutral-200 shadow-sm transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
      >
        {isUploading ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <Camera size={18} />
        )}
        <span className="hidden sm:inline">
          {isUploading ? "Uploading..." : "Scan Label"}
        </span>
      </button>
    </div>
  );
}