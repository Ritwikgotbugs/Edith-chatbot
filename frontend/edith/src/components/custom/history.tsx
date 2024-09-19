import React from 'react';
import ReactMarkdown from 'react-markdown';
import DocMessage from '../chat/doc-reply'; // Adjust the path as needed

interface ChatLog {
  message: string;
  isBot: boolean;
  pdfUrl?: string;
}

interface HistoryCardProps {
  chatLog: ChatLog[];
}

const HistoryCard: React.FC<HistoryCardProps> = ({ chatLog }) => {
  return (
    <div className="p-4 bg-[#f9f9f9] rounded-lg shadow-lg">
      {chatLog.map((chat, index) => (
        <div
          key={index}
          className={`p-4 rounded-xl ${chat.isBot ? 'bg-[#303030] text-white' : 'bg-white text-black'}`}
        >
          {chat.pdfUrl ? (
            <DocMessage pdfurl={chat.pdfUrl} onSummaryReceived={function (summary: string): void {
                      throw new Error('Function not implemented.');
                  } }  />
          ) : (
            <ReactMarkdown>{chat.message}</ReactMarkdown>
          )}
        </div>
      ))}
    </div>
  );
};

export default HistoryCard;
