import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import HistoryCard from '@/components/custom/history';
import DocMessage from '../doc-reply';

interface ChatLog {
  message: string;
  isBot: boolean;
  pdfUrl?: string;
}

interface HistoryAccordionProps {
  chatHistory: ChatLog[][]; // Array of arrays representing chat history sessions
}

const HistoryAccordion: React.FC<HistoryAccordionProps> = ({ chatHistory }) => {
  const [selectedHistory, setSelectedHistory] = useState<ChatLog[] | null>(null);

  return (
    <Accordion type="single" collapsible className="space-y-2">
      {chatHistory.length === 0 ? (
        <p className="text-white">No history available.</p>
      ) : (
        chatHistory.map((history, index) => (
          <AccordionItem
            key={index}
            value={`session-${index}`}
            className="bg-[#1e1e1e] rounded-lg border border-[#2a2a2a]" // Darker background and border
          >
            <AccordionTrigger className="w-full p-4 flex items-center justify-between text-white cursor-pointer rounded-t-lg hover:bg-[#2a2a2a] focus:outline-none">
              <span className="text-lg font-semibold">Session {index + 1}</span>
              <span className="text-sm text-gray-400">View Conversation</span>
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-[#282828] rounded-b-lg space-y-2">
              {history.map((chat, idx) => (
                <div
                  key={idx}
                  className={`flex ${chat.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${chat.isBot ? 'bg-[#383838] text-white' : 'bg-[#4a4a4a] text-white'}`}
                  >
                    <p>{chat.message}</p>
                    {chat.pdfUrl && (
                      <DocMessage pdfurl={chat.pdfUrl} onSummaryReceived={()=> (console.log('Summarise'))}/>
                    )}
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))
      )}
    </Accordion>
  );
};

export default HistoryAccordion;
