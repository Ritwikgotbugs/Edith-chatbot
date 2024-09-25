'use client';
import React, { useState } from 'react';
import MainContent from './content';
import Footer from './footer';
import Header from './header';
import Sidebar from './sidenav';

const MainLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-zinc-800 text-white">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;