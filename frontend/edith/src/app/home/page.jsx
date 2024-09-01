"use client"; // Correct directive

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function HomePage() {
  const [chats, setChats] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isDocumentsExpanded, setIsDocumentsExpanded] = useState(false);

  const router = useRouter(); // Using Next.js router for navigation

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      setChats([...chats, { message: currentMessage, from: 'user' }]);
      setCurrentMessage('');
    }
  };

  const handleAdminLogin = () => {
    // Replace this with real authentication logic
    if (adminPassword === 'admin123') {
      setShowAdminLogin(false);
      router.push('/admin'); // Navigate to AdminPage
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="relative h-screen bg-gray-800">
      {/* Main Content Area */}
      <div className={`flex h-full ${showAdminLogin ? 'blur-sm' : ''}`}>
        {/* Side Panel */}
        <div className="w-1/4 ml-0 bg-gray-800 text-white p-4 flex flex-col">
          {/* Profile Section */}
          <div className="mt-2 p-12 bg-gray-700 rounded-2xl">
            <h2 className="mb-4 text-xl font-bold">Samyak Tripathi</h2>
            <p className='mb-4 text-base'>ID: 12345</p>
            <p className='text-base py-1'>Role : <span className='bg-black ml-1 rounded-3xl py-1 px-3.5'>Developer</span></p>
          </div>

          {/* Tabs Section */}
          <div className="mb-0 mt-6 p-11 bg-gray-700 rounded-2xl">
            <ul>
              <li className="mt-2 p-2 mb-2 w-full bg-gray-500 hover:bg-zinc-600 cursor-pointer text-center transition-colors duration-400">Home</li>
              <li className="p-2 mb-2 w-full bg-gray-500 cursor-pointer hover:bg-zinc-600 text-center transition-colors duration-400">History</li>
              <li
                className="p-2 mb-2 w-full bg-gray-500 hover:bg-zinc-600 cursor-pointer text-center transition-colors duration-400"
                onClick={() => setShowAdminLogin(true)}
              >
                Admin Login
              </li>
            </ul>
          </div>

          {/* My Documents Section */}
          <div className="mt-auto mb-0.5 p-4 bg-gray-700 rounded-2xl">
            <div
              className="cursor-pointer text-xl text-center"
              onClick={() => setIsDocumentsExpanded(!isDocumentsExpanded)}
            >
              My Documents
            </div>
            {isDocumentsExpanded && (
              <div className="mt-20">
                <p className="text-base text-center">Document 1</p>
                <p className="text-base text-center">Document 2</p>
                <p className="text-base text-center">Document 3</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex flex-col mt-2 text-slate-800 bg-gray-800 p-4 mr-1">
          {/* Chat Area */}
          <div className="flex-1 p-8 bg-gray-300 rounded-2xl overflow-y-auto">
            {chats.map((chat, index) => (
              <div key={index} className={`mb-4 ${chat.from === 'user' ? 'text-right' : ''}`}>
                <div className={`p-2 ${chat.from === 'user' ? 'bg-slate-800 text-white' : 'bg-blue-500 text-slate-800'} rounded w-max ${chat.from === 'user' ? 'ml-auto' : ''}`}>
                  {chat.message}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Bar */}
          <div className="mt-4 relative">
            <input
              type="text"
              className="w-full bg-gray-300 text-slate-800 p-3 pr-16 border rounded-2xl"
              placeholder="Chat with Edith..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={handleSendMessage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black hover:bg-blue-950 text-white font-bold py-1 px-4 rounded-3xl"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Admin Login Popup */}
      {showAdminLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-center text-white">Admin Login</h2>
            <input
              type="password"
              className="w-full text-slate-800 p-2 mb-4 border rounded"
              placeholder="Enter Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                onClick={() => setShowAdminLogin(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAdminLogin}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
