// components/Admin/DocumentUpdate.tsx

import React, { useState } from 'react';

const DocumentUpdate: React.FC = () => {
  const [documentName, setDocumentName] = useState('');
  const [documentList, setDocumentList] = useState<string[]>([]);
  const [editingDocument, setEditingDocument] = useState<number | null>(null);

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

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Document Update</h3>
      <div className="flex mb-4">
        <input
          type="text"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none"
          placeholder="Enter document name"
        />
        <button
          onClick={handleAddDocument}
          className="px-6 py-3 bg-green-600 text-white rounded-r-md hover:bg-green-700 focus:outline-none"
        >
          {editingDocument !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {documentList.map((doc, index) => (
          <li key={index} className="flex justify-between items-center py-3">
            <span className="text-gray-700">{doc}</span>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEditDocument(index)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteDocument(index)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {documentList.length === 0 && (
          <li className="text-gray-500 text-center py-3">No documents added yet.</li>
        )}
      </ul>
    </div>
  );
};

export default DocumentUpdate;
