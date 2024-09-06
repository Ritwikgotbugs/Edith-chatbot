import { db } from '@/firebase/client';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import React, { useState } from 'react';

const BadWordsManagement: React.FC = () => {
  const [badWord, setBadWord] = useState('');
  const [badWordsList, setBadWordsList] = useState<string[]>([]);

  const handleAddBadWord = async () => {
    if (badWord.trim() !== '') {
      const newBadWord = badWord.trim();
      
      try {
        await addDoc(collection(db, 'badwords'), { word: newBadWord });

        setBadWordsList([...badWordsList, newBadWord]);
        setBadWord('');

      } catch (error) {
        console.error('Error adding bad word to Firestore: ', error);
      }
    }
  };

  const handleRemoveBadWord = (wordToRemove: string) => {
    setBadWordsList(badWordsList.filter((word) => word !== wordToRemove));
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Bad Words Management</h3>
      <div className="flex mb-4">
        <input
          type="text"
          value={badWord}
          onChange={(e) => setBadWord(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none"
          placeholder="Enter a bad word"
        />
        <button
          onClick={handleAddBadWord}
          className="px-6 py-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none"
        >
          Add
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {badWordsList.map((word, index) => (
          <li key={index} className="flex justify-between items-center py-3">
            <span className="text-gray-700">{word}</span>
            <button
              onClick={() => handleRemoveBadWord(word)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
        {badWordsList.length === 0 && (
          <li className="text-gray-500 text-center py-3">No bad words added yet.</li>
        )}
      </ul>
    </div>
  );
};

export default BadWordsManagement;
