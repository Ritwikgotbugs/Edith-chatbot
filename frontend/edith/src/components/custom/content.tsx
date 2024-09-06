import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { db, storage } from '@/firebase/client';
import { ref, getDownloadURL } from 'firebase/storage';
import { FaFilePdf } from 'react-icons/fa';
import { getDocs, collection } from 'firebase/firestore';
import { toast } from 'sonner';

const MainContent: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [chatLog, setChatLog] = useState<{ message: string, isBot: boolean, pdfUrl?: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [badWordsList, setBadWordsList] = useState<string[]>([]);

  useEffect(() => {
    fetchBadWords();
  }, []);

  const handleSendPrompt = async () => {
    setLoading(true);
    setError('');
    const newChatLog = [...chatLog, { message: prompt, isBot: false }];
    setChatLog(newChatLog);
    setPrompt('');

    console.log('Bad Words:', badWordsList);

    if (prompt.toLowerCase().includes('hr policy')) {
      try {
        const hrPolicyUrl = await fetchHRPolicy();
        setChatLog([...newChatLog, { message: '', isBot: true, pdfUrl: hrPolicyUrl }]);
      } catch (err) {
        setError('Failed to fetch the HR policy. Please try again.');
      }
    } 
    else if (splitPrompt(prompt).some(word => badWordsList.includes(word))) {
      setChatLog([...newChatLog, { message: 'Please refrain from using inappropriate language.', isBot: true }]);
    } 
    else {
      try {
        const formData = new FormData();
        formData.append('prompt', prompt); 

        const result = await axios.post('http://localhost:5000/process', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setChatLog([...newChatLog, { message: result.data.result, isBot: true }]);
      } catch (err) {
        toast.error('Failed to process the prompt. Please try again.');
      }
    }

    setLoading(false);
  };

  const fetchHRPolicy = async (): Promise<string> => {
    const policyRef = ref(storage, 'HR-policy.pdf');
    const downloadUrl = await getDownloadURL(policyRef);
    return downloadUrl;
  };

  const fetchBadWords = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'badwords'));
      const badWordsList = querySnapshot.docs.map(doc => doc.data().word);
      setBadWordsList(badWordsList);
    } catch (error) {
      console.error('Error fetching bad words from Firestore:', error);
      toast.error('Error fetching bad words.');
    }
  };

  const splitPrompt = (prompt: string): string[] => {
    return prompt.split(' ').map(word => word.toLowerCase());
  };

  return (
    <main className="flex-1 flex flex-col justify-between p-8">
      {/* Chat Log */}
      <div className="flex flex-col space-y-4 bg-gray-800 p-6 rounded-lg overflow-auto h-3/4">
        {chatLog.map((chat, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${chat.isBot ? 'bg-gray-700 text-white' : 'bg-blue-600 text-white self-end'}`}
          >
            {chat.pdfUrl ? (
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.open(chat.pdfUrl, '_blank')}>
                <FaFilePdf className="text-red-600 text-2xl" />
                <span>HR-policy.pdf</span>
              </div>
            ) : (
              <span>{chat.message}</span>
            )}
          </div>
        ))}
      </div>

      {/* Prompt Input */}
      <div className="flex items-center mt-4">
        <input
          type="text"
          placeholder="Type your prompt here..."
          className="flex-grow p-4 rounded bg-gray-700 text-white"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="ml-4 p-4 bg-blue-600 text-white rounded"
          onClick={handleSendPrompt}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Send'}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </main>
  );
};

export default MainContent;
