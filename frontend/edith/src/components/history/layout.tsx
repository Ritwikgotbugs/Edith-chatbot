'use client';
import React, { useEffect, useState } from 'react';
import HistoryAccordion from '../chat/context/history';
import Sidebar from '../custom/sidenav';

const HistoryPage: React.FC = () => {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Only access localStorage on the client side
      const savedHistory = localStorage.getItem('chatHistory');
      if (savedHistory) {
        setChatHistory(JSON.parse(savedHistory));
      }
    }
  }, []);

  return (
    <div className="flex h-screen bg-[#111111] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col p-10">
        <h1 className="text-2xl font-bold mb-4">Chat History</h1>
        <HistoryAccordion chatHistory={chatHistory} />
      </div>
    </div>
  );
};

export default HistoryPage;
