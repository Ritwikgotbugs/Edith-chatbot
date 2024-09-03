import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 bg-gray-800 flex justify-between items-center">
      <div className="text-lg font-semibold">My Chats</div>
      <div className="text-green-500">Online</div>
    </header>
  );
};

export default Header;
