import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-5 ml-4 mr-4 mt-4 bg-orange-600 flex rounded-2xl justify-between items-center">
      <div className="text-lg font-semibold">My Chats</div>
      <div className="text-green-500">Online</div>
    </header>
  );
};

export default Header;