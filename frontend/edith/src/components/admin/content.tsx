'use client';

import React, { useState } from 'react';
import QueryGraph from '@/components/admin/ui/graph';
import BadWordsManagement from '@/components/admin/ui/badwords';
import DocumentUpdate from '@/components/admin/ui/document';
import RoleManagement from '@/components/admin/ui/role';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <div className="flex flex-col space-y-6">
      <QueryGraph />

      <div className="flex justify-between space-x-6">
        {/* Bad Words Management */}
        <Dialog>
          <DialogTrigger asChild>
            <div
              className="cursor-pointer p-6 bg-orange-600 hover:bg-orange-800 text-white rounded-xl flex-1 flex items-center justify-center text-xl font-semibold"
              onClick={() => setActiveTab('badWords')}
            >
              Bad Words Management
            </div>
          </DialogTrigger>
          <DialogContent className='bg-zinc-900 text-white'>
            <DialogHeader>
            <DialogTitle></DialogTitle>
              <DialogDescription>
      
              </DialogDescription>
            </DialogHeader>
            
            <BadWordsManagement />
          </DialogContent>
        </Dialog>

        {/* Role Management */}
        <Dialog>
          <DialogTrigger asChild>
            <div
              className="cursor-pointer p-6 bg-orange-600 hover:bg-orange-800 text-white rounded-xl flex-1 flex items-center justify-center text-xl font-semibold"
              onClick={() => setActiveTab('roleManagement')}
            >
              Role Management
            </div>
          </DialogTrigger>
          <DialogContent className='bg-zinc-900 text-white'>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
            
              </DialogDescription>
            </DialogHeader>
            <RoleManagement />
          </DialogContent>
        </Dialog>

        {/* Document Update */}
        <Dialog>
          <DialogTrigger asChild>
            <div
              className="cursor-pointer p-6 bg-orange-600 hover:bg-orange-800 text-white rounded-xl flex-1 flex items-center justify-center text-xl font-semibold"
              onClick={() => setActiveTab('documentUpdate')}
            >
              Document Update
            </div>
          </DialogTrigger>
          <DialogContent className='bg-zinc-900 text-white'>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
               
              </DialogDescription>
            </DialogHeader>
            <DocumentUpdate />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPage;
