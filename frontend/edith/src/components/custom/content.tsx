import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import DocMessage from '../chat/doc-reply';
import { fetchBadWords, fetchHRPolicy, saveKeywordToGraph, processPrompt, splitPrompt } from '@/firebase/utils/utils';

const MainContent: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [chatLog, setChatLog] = useState<{ message: string, isBot: boolean, pdfUrl?: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [badWordsList, setBadWordsList] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const words = await fetchBadWords();
      setBadWordsList(words);
    };
    fetchData();
  }, []);

  const handleSendPrompt = async () => {
    setLoading(true);
    setError('');
    const newChatLog = [...chatLog, { message: prompt, isBot: false }];
    setChatLog(newChatLog);
    setPrompt('');

    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.includes('hr policy')) {
      try {
        const hrPolicyUrl = await fetchHRPolicy();
        await saveKeywordToGraph('hr-policy');
        setChatLog([...newChatLog, { message: '', isBot: true, pdfUrl: hrPolicyUrl }]);
      } catch (err) {
        setError('Failed to fetch the HR policy. Please try again.');
      }
    } 
    else if (lowerPrompt.includes('it support')) {
      try {
        await saveKeywordToGraph('IT-support');
        const result = await processPrompt(newChatLog, prompt);
        setChatLog(result);
      } catch (err) {
        setError('Failed to process the IT support query. Please try again.');
      }
    } 
    else {
      try {
        const result = await processPrompt(newChatLog, prompt);
        setChatLog(result);
        await saveKeywordToGraph('general');
      } catch (err) {
        toast.error('Failed to process the prompt. Please try again.');
      }
    }

    setLoading(false);
  };

  return (
    <main className="flex-1 flex flex-col justify-between p-8">
      <div className="flex flex-col space-y-4 bg-zinc-900 p-6 rounded-2xl overflow-y-auto h-96 custom-scrollbar">
        {chatLog.map((chat, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl ${chat.isBot ? 'bg-zinc-600 text-white self-start' : 'bg-white text-black self-end'}`}
          >
            {chat.pdfUrl ? (
              <DocMessage pdfurl={chat.pdfUrl} />
            ) : (
              <span>{chat.message}</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center mt-4">
        <input
          type="text"
          placeholder="Type your prompt here..."
          className="flex-grow p-3 rounded bg-zinc-600 text-white focus:outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="p-3 ml-2 rounded-l bg-blue-600 rounded-r text-white"
          onClick={() => {
            if (splitPrompt(prompt).some(word => badWordsList.includes(word))) {
              toast.error('Your prompt contains bad words. Please rephrase.');
              return;
            }
            handleSendPrompt();
          }}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Send'}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </main>
  );
};

export default MainContent;
