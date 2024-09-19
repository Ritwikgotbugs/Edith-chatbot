import React from 'react';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const router = useRouter();

  const navigateToHistory = () => {
    router.push('/history');
  };

  return (
    <header className="p-4 bg-[#232323] text-white flex justify-between items-center mx-5 mt-5 rounded-xl">
      <div className="text-lg font-semibold">My Chats</div>
      <div className="flex space-x-4">
        <button 
          className="p-2 bg-green-800 rounded-lg"
          onClick={navigateToHistory}
        >
          History
        </button>
      </div>
    </header>
  );
};

export default Header;
