"use client";

import { useState } from "react";
import { auth } from "../src/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export default function TestStoragePage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const provider = new GoogleAuthProvider();

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Signed in successfully.");
    } catch (err) {
      console.error(err);
      alert("Sign-in failed.");
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    alert("Signed out.");
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file first.");
    const user = auth.currentUser;
    if (!user) return alert("Sign in with Firebase first.");

    setUploading(true);
    setMessage("");

    const token = await user.getIdToken();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) setMessage(`Uploaded to: ${data.path}`);
      else setMessage(`Upload failed: ${data.error}`);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed (network error).");
    }

    setUploading(false);
  };

  return (
    <div className="p-10 flex flex-col gap-4 items-start">
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleSignIn}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Sign In with Google
        </button>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Sign Out
        </button>
      </div>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>
      <p>{message}</p>
    </div>
  );
}
