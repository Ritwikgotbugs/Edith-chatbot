'use client';
import React, { useState } from 'react';
import AdminPage from './content';
import Sidebar from '../custom/sidenav';


const MainLayout: React.FC = () => {


  return (
    <div className="flex h-screen bg-[#111111] text-white">
      <Sidebar/>
      <div className="flex-1 flex flex-col p-10">
        <AdminPage />
      </div>
    </div>
  );
};

export default MainLayout;
