// components/Admin/DocumentUpdate.tsx

import React, { useState } from 'react';

const DocumentUpdate: React.FC = () => {
  const [documentName, setDocumentName] = useState('');
  const [documentList, setDocumentList] = useState<string[]>([]);
  const [editingDocument, setEditingDocument] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleAddDocument = () => {
    if (documentName.trim() !== '') {
      if (editingDocument !== null) {
        const updatedDocuments = documentList.map((doc, index) =>
          index === editingDocument ? documentName.trim() : doc
        );
        setDocumentList(updatedDocuments);
        setEditingDocument(null);
      } else {
        setDocumentList([...documentList, documentName.trim()]);
      }
      setDocumentName('');
    }
  };

  const handleEditDocument = (index: number) => {
    setDocumentName(documentList[index]);
    setEditingDocument(index);
  };

  const handleDeleteDocument = (index: number) => {
    setDocumentList(documentList.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-zinc-900 p-10">
      <h3 className="text-2xl font-bold mb-10 text-white">Document Update</h3>
     
        <div className="flex-1 flex flex-col md:flex-row items-center">
          <input
            type="text"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="flex-1 p-3 mb-3 md:mb-0 border text-black border-gray-300 rounded-l-md focus:outline-none"
            placeholder="Enter document name"
          />
          <button
            onClick={handleAddDocument}
            className="px-6 py-3 bg-green-600 text-white rounded-r-md hover:bg-green-700 focus:outline-none"
          >
            {editingDocument !== null ? 'Update' : 'Add'}
          </button>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-center">
          <label className="flex flex-col items-center bg-gray-600 text-white p-3 rounded-md cursor-pointer hover:bg-gray-700">
            <span>Attach File</span>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {file && (
            <div className="mt-2 text-white">
              <span>Selected file: {file.name}</span>
            </div>
          )}
        </div>
      
      <div className="max-h-60 mt-12 overflow-y-auto">
        <ul className="divide-y divide-white">
          {documentList.map((doc, index) => (
            <li key={index} className="flex justify-between items-center py-3">
              <span className="text-white">{doc}</span>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEditDocument(index)}
                  className="text-blue-400 hover:text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteDocument(index)}
                  className="text-red-400 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          {documentList.length === 0 && (
            <li className="text-gray-400 text-center py-3">No documents added yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DocumentUpdate;
