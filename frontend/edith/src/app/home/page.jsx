"use client"; // Correct directive

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaHistory, FaUserLock, FaFolderOpen, FaPaperPlane, FaBars, FaTimes } from 'react-icons/fa'; // Import icons

function HomePage() {
  const [chats, setChats] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isDocumentsExpanded, setIsDocumentsExpanded] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true); // State for collapsible side nav

  const router = useRouter();

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
    <div className="relative h-screen bg-gray-700">
      {/* Hamburger/Cross Menu Button */}
      <button
        className="absolute top-2 left-4 mt-2 z-50 p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
        onClick={() => setIsNavCollapsed(!isNavCollapsed)}
      >
        {isNavCollapsed ? <FaBars size={24} /> : <FaTimes size={24} />} {/* Toggle between icons */}
      </button>

      {/* Main Content Area */}
      <div className={`flex h-full ${showAdminLogin ? 'blur-sm' : ''}`}>
        {/* Collapsible Side Panel */}
        <div
          className={`fixed top-2 left-2 z-40 h-full bg-gray-700 text-black p-4 flex flex-col transition-transform duration-300 ease-in-out ${
            isNavCollapsed ? '-translate-x-full' : 'translate-x-0'
          } w-64`}
        >
          {/* Profile Section */}
          <div className="mt-12 p-7 bg-gray-300 rounded-2xl">
            <h2 className="mb-4 text-2xl font-bold">Samyak Tripathi</h2>
            <p className="mb-3 text-base">ID: 12345</p>
            <p className="text-base py-1">
              Role :{' '}
              <span className="bg-black ml-1 text-base text-white rounded-3xl py-1 px-3.5">
                Developer
              </span>
            </p>
          </div>

          {/* Tabs Section */}
          <div className="mt-10 p-6 bg-gray-300 rounded-2xl">
            <ul>
              <li className="flex items-center justify-left mt-2 p-2 mb-2 w-full hover:bg-gray-500 cursor-pointer text-left text-lg transition-colors rounded-2xl duration-400">
                <FaHome className="mr-6" /> Home
              </li>
              <li className="flex items-center justify-left p-2 mb-2 w-full cursor-pointer hover:bg-gray-500 text-left text-lg transition-colors rounded-2xl duration-400">
                <FaHistory className="mr-6" /> History
              </li>
              <li
                className="flex items-center justify-left p-2 mb-2 w-full hover:bg-gray-500 cursor-pointer text-lg text-left transition-colors rounded-2xl duration-400"
                onClick={() => setShowAdminLogin(true)}
              >
                <FaUserLock className="mr-6" /> Admin Login
              </li>
            </ul>
          </div>

          {/* My Documents Section */}
          <div className="mt-auto mb-2 p-6 bg-gray-300 rounded-2xl">
            <div
              className="cursor-pointer text-xl text-center flex mr-2 mt-0 items-center justify-center"
              onClick={() => setIsDocumentsExpanded(!isDocumentsExpanded)}
            >
              <FaFolderOpen className="mr-3" /> My Documents
            </div>
            <div
              className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                isDocumentsExpanded ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <div className="mt-4">
                <p className="text-base text-center">Document 1</p>
                <p className="text-base text-center">Document 2</p>
                <p className="text-base text-center">Document 3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Panel */}
        <div className={`flex-1 flex flex-col mt-2 text-white bg-gray-700 p-4 transition-all duration-300 ease-in-out ${isNavCollapsed ? 'ml-0' : 'ml-64'}`}>
          {/* Chat Area */}
          <div className="flex-1 p-3 bg-gray-300 mr-8 rounded-2xl ml-16 overflow-y-auto">
            {chats.map((chat, index) => (
              <div key={index} className={`mb-4 ${chat.from === 'user' ? 'text-right' : ''}`}>
                <div className={`p-2 ${chat.from === 'user' ? 'bg-slate-800 text-white' : 'bg-blue-500 text-slate-800'} rounded w-max ${chat.from === 'user' ? 'ml-auto' : ''}`}>
                  {chat.message}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Bar */}
          <div className="mt-4 mb-2 px-1 ml-16 mr-8 relative">
            <input
              type="text"
              className="flex-1 bg-gray-300 w-full text-slate-800 px-1 py-3 border rounded-2xl"
              placeholder=" Chat with Edith..."
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
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black hover:bg-blue-950 text-white font-bold py-1 px-4 rounded-3xl flex items-center justify-center"
            >
              <FaPaperPlane className="mr-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Admin Login Popup */}
      {showAdminLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-00 bg-opacity-50">
          <div className="bg-gray-400 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-center text-black">Admin Login</h2>
            <input
              type="password"
              className="w-full text-slate-800 p-2 mb-4 border rounded"
              placeholder="Enter Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAdminLogin(); // Call login function on Enter key
                }
              }}
            />
            <div className="flex justify-between">
              <button
                onClick={() => setShowAdminLogin(false)}
                className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAdminLogin}
                className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
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
