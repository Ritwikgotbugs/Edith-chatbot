'use client';

import React from 'react';

interface AdminLoginProps {
  showAdminLogin: boolean;
  setShowAdminLogin: React.Dispatch<React.SetStateAction<boolean>>;
  adminPassword: string;
  setAdminPassword: React.Dispatch<React.SetStateAction<string>>;
  handleAdminLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({
  showAdminLogin,
  setShowAdminLogin,
  adminPassword,
  setAdminPassword,
  handleAdminLogin,
}) => {
  return (
    showAdminLogin && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">Admin Login</h2>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Enter Admin Password"
            className="border p-2 w-full mb-4 rounded-lg"
          />
          <button
            onClick={handleAdminLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
          <button
            onClick={() => setShowAdminLogin(false)}
            className="px-4 py-2 ml-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );
};

export default AdminLogin;
