'use client';

import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { db, auth } from '@/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import Layout from '@/app/layout';
import BadWordsManagement from '@/components/admin/badwords';
import DocumentUpdate from '@/components/admin/document';
import QueryGraph from '@/components/admin/graph';
import RoleManagement from '@/components/admin/role';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState({ name: '', empID: '', role:'' });
  const closeModal = () => {
    setActiveTab(null);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const docRef = doc(db, "users", `${auth.currentUser?.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserProfile({
            name: data.name || '',
            empID: data.empID || '',
            role: data.role || '',
          });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Layout
    >
      <div className="flex flex-col space-y-6">
        <QueryGraph />

        <div className="flex justify-between space-x-6">
          <div
            className="cursor-pointer p-6 bg-gray-800 hover:bg-gray-900 text-white rounded-xl flex-1 flex items-center justify-center text-xl font-semibold"
            onClick={() => setActiveTab('badWords')}
          >
            Bad Words Management
          </div>

          <div
            className="cursor-pointer p-6 bg-gray-800 hover:bg-gray-900 text-white rounded-xl flex-1 flex items-center justify-center text-xl font-semibold"
            onClick={() => setActiveTab('roleManagement')}
          >
            Role Management
          </div>

          <div
            className="cursor-pointer p-6 bg-gray-800 hover:bg-gray-900 text-white rounded-xl flex-1 flex items-center justify-center text-xl font-semibold"
            onClick={() => setActiveTab('documentUpdate')}
          >
            Document Update
          </div>
        </div>

        {activeTab && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg relative">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
                onClick={closeModal}
              >
                &times;
              </button>

              {activeTab === 'badWords' && <BadWordsManagement />}
              {activeTab === 'roleManagement' && <RoleManagement />}
              {activeTab === 'documentUpdate' && <DocumentUpdate />}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminPage;
