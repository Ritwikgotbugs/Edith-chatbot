// components/Admin/BadWordsManagement.tsx

import React, { useState } from 'react';

const BadWordsManagement: React.FC = () => {
  const [badWord, setBadWord] = useState('');
  const [badWordsList, setBadWordsList] = useState<string[]>([]);

  const handleAddBadWord = () => {
    if (badWord.trim() !== '') {
      setBadWordsList([...badWordsList, badWord.trim()]);
      setBadWord('');
    }
  };

  const handleRemoveBadWord = (wordToRemove: string) => {
    setBadWordsList(badWordsList.filter((word) => word !== wordToRemove));
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 bg-zinc-900 text-white">Bad Words Management</h3>
      <div className="flex mb-4">
        <input
          type="text"
          value={badWord}
          onChange={(e) => setBadWord(e.target.value)}
          className="flex-1 p-3 border bg-white text-black border-white rounded-l-md focus:outline-none"
          placeholder="Enter a bad word"
        />
        <button
          onClick={handleAddBadWord}
          className="px-6 py-3 bg-blue-600  text-white rounded-r-md hover:bg-blue-800 focus:outline-none"
        >
          Add
        </button>
      </div>
      <ul className="divide-y bg-zinc-900 divide-white">
        {badWordsList.map((word, index) => (
          <li key={index} className="flex justify-between items-center py-3">
            <span className="text-white">{word}</span>
            <button
              onClick={() => handleRemoveBadWord(word)}
              className="text-red-500  hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
        {badWordsList.length === 0 && (
          <li className="text-white text-center py-3">No bad words added yet.</li>
        )}
      </ul>
    </div>
  );
};

export default BadWordsManagement;
