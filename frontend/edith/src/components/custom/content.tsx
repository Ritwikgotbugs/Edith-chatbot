import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';
import DocMessage from '../chat/doc-reply';
import { fetchBadWords, fetchHRPolicy, saveKeywordToGraph, processPrompt, splitPrompt } from '@/firebase/utils/utils';
import { useRouter } from 'next/navigation';

interface ChatLog {
  message: string;
  isBot: boolean;
  pdfUrl?: string;
}

const MainContent: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [chatLog, setChatLog] = useState<ChatLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [badWordsList, setBadWordsList] = useState<string[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatLog[][]>([]); // History state
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem('chatHistory');
      if (savedHistory) {
        setChatHistory(JSON.parse(savedHistory));
      }
    }

    const fetchData = async () => {
      const words = await fetchBadWords();
      setBadWordsList(words);
    };
    fetchData();
  }, []);

  const handleSendPrompt = async () => {
    if (!prompt.trim()) {
      toast.error('You need to provide a prompt.');
      return;
    }

    const wordsInPrompt = splitPrompt(prompt);
    if (wordsInPrompt.some(word => badWordsList.includes(word))) {
      toast.error('Your prompt contains bad words. Please rephrase.');
      return;
    }

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
    } else if (lowerPrompt.includes('it support')) {
      try {
        await saveKeywordToGraph('IT-support');
        const result = await processPrompt(newChatLog, prompt);
        setChatLog(result);
      } catch (err) {
        setError('Failed to process the IT support query. Please try again.');
      }
    } else {
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

  const handleNewChat = () => {
    if (chatLog.length > 0) {
      const updatedChatHistory = [...chatHistory, chatLog];
      setChatHistory(updatedChatHistory);

      if (typeof window !== 'undefined') {
        localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistory));
      }
    }
    setChatLog([]);
    setPrompt('');
  };

  const handleSummaryReceived = (summary: string) => {
    setChatLog([...chatLog, { message: summary, isBot: true }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      if (!prompt.trim()) {
        toast.error('You need to provide a prompt.');
        return;
      }

      const wordsInPrompt = splitPrompt(prompt);
      if (wordsInPrompt.some(word => badWordsList.includes(word))) {
        toast.error('Your prompt contains bad words. Please rephrase.');
        return;
      }

      handleSendPrompt();
    }
  };

  return (
    <main className="inline-block flex-col justify-between p-4">
      <div className="flex flex-col space-y-4 bg-[#232323] p-4 rounded-lg overflow-y-auto h-96 custom-scrollbar">
        <button
          className="mb-4 p-4 text-white rounded-xl underline"
          onClick={handleNewChat}
        >
          Save and start a new chat
        </button>
        {chatLog.map((chat, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl ${chat.isBot ? 'bg-[#303030] text-white self-start' : 'bg-white text-black self-end'}`}
          >
            {chat.pdfUrl ? (
              <DocMessage pdfurl={chat.pdfUrl} onSummaryReceived={handleSummaryReceived} />
            ) : (
              <ReactMarkdown>{chat.message}</ReactMarkdown>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center mt-4 border-none text-black">
        <input
          type="text"
          placeholder="Type your prompt here..."
          className="flex-grow p-4 rounded-xl bg-[#232323] text-white focus:outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress} // Add keypress event
        />
        <button
          className="ml-4 p-4 bg-[#212121] text-white rounded-xl"
          onClick={() => {
            if (!prompt.trim()) {
              toast.error('You need to provide a prompt.');
              return;
            }

            const wordsInPrompt = splitPrompt(prompt);
            if (wordsInPrompt.some(word => badWordsList.includes(word))) {
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
