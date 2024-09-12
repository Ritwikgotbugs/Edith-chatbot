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
    <div className="flex flex-col space-y-6 bg-[#111111]">
      <QueryGraph />

      <div className="flex flex-wrap justify-center items-start">
        <div className="p-2 flex-1 min-w-[250px] max-w-[300px]"> 
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer p-4 bg-[#232323] hover:bg-[#171717] text-white rounded-xl flex items-center justify-center text-lg font-semibold">
                Bad Words Management
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bad Words Management</DialogTitle>
                <DialogDescription>
                  Manage your application&apos;s bad words list here.
                </DialogDescription>
              </DialogHeader>
              <BadWordsManagement />
            </DialogContent>
          </Dialog>
        </div>

        <div className="p-2 flex-1 min-w-[250px] max-w-[300px]">
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer p-4 bg-[#232323] hover:bg-[#171717] text-white rounded-xl flex items-center justify-center text-lg font-semibold">
                Role Management
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Role Management</DialogTitle>
                <DialogDescription>
                  Manage roles for users within the application.
                </DialogDescription>
              </DialogHeader>
              <RoleManagement />
            </DialogContent>
          </Dialog>
        </div>

        <div className="p-2 flex-1 min-w-[250px] max-w-[300px]">
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer p-4 bg-[#232323] hover:bg-[#171717] text-white rounded-xl flex items-center justify-center text-lg font-semibold">
                Document Update
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Document Update</DialogTitle>
                <DialogDescription>
                  Update and manage your documents.
                </DialogDescription>
              </DialogHeader>
              <DocumentUpdate />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
