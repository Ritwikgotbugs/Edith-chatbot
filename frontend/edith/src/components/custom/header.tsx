import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 bg-[#232323] text-white flex justify-between items-center mx-5 mt-5 rounded-xl">
      <div className="text-lg font-semibold">My Chats</div>
      <div className="text-green-500">Online</div>
    </header>
  );
};

export default Header;
