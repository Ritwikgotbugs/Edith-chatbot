"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { db, storage } from "../../../../backend/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const DocumentUpload: React.FC = () => {
  const [document, setDocument] = useState<File | null>(null); // Type the document state as File or null
  const [fileName, setFileName] = useState<string>(""); // Type the fileName state as string
  const [loading, setLoading] = useState<boolean>(false); // Type the loading state as boolean
  const [error, setError] = useState<string | null>(null); // Type the error state as string or null

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocument(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (document) {
      setLoading(true);
      try {
        const storageRef = ref(storage, `documents/${fileName}`);
        await uploadBytes(storageRef, document);

        const downloadURL = await getDownloadURL(storageRef);

        await addDoc(collection(db, "documents"), {
          name: fileName,
          url: downloadURL,
          createdAt: new Date(),
        });

        console.log("Document successfully uploaded!");
        setDocument(null); // Clear the file input
        setFileName(""); // Clear the file name
      } catch (err) {
        console.error("Error uploading document:", err);
        setError("Failed to upload document");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit" disabled={loading || !document}>
        {loading ? "Uploading..." : "Upload Document"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default DocumentUpload;
