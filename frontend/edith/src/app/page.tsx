"use client"

import React, { useState }  from 'react';
import  DocumentUpload  from "../components/DocumentUpload"; // Adjust the path as needed

const Pages = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const url = await DocumentUpload(file);
        setUploadUrl(url)
        console.log('File uploaded successfully. URL:', url);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div>
      <h1>Upload a Document</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadUrl && (
        <div>
          <p>File uploaded successfully!</p>
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer">
            View Uploaded File
          </a>
        </div>
      )}
    </div>
  );
};

export default Pages;
