"use client"; // Correct directive

import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa'; // Import search and plus icons
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js

function AdminPage() {
  const [activeTab, setActiveTab] = useState(null); 
  const [badWord, setBadWord] = useState(''); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [badWordsList, setBadWordsList] = useState([]); 
  const [searchResult, setSearchResult] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [employeeSearch, setEmployeeSearch] = useState(''); 
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Samyak Tripathi', role: 'A' },
    { id: 2, name: 'Ritwik Sharma', role: 'B' },
    { id: 3, name: 'Himanshu Bhadani', role: 'C' },
    { id: 4, name: 'Manavi Lahoti', role: 'D' },
    { id: 4, name: 'Annish Agarwal', role: 'D' },
    { id: 4, name: 'Arnav Agarwal', role: 'D' },
  ]); 

  const router = useRouter(); // Using Next.js router for navigation

  
  const closeModal = () => setActiveTab(null);

  
  const addBadWord = () => {
    if (badWord.trim()) {
      setBadWordsList([...badWordsList, badWord]); 
      setBadWord('');
      setMessage('Bad word added'); 
      setTimeout(() => setMessage(''), 2000); 
    }
  };


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addBadWord();
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const foundWord = badWordsList.find((word) => word.toLowerCase() === searchQuery.toLowerCase());
      setSearchResult(foundWord || ''); 
    } else {
      setSearchResult('');
    }
  };

 
  const handleAdminLogout = () => {
    router.push('/home'); 
  };

  
  const handleRoleChange = (id, newRole) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, role: newRole } : emp));
  };

  // Filtered list of employees based on search query
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  return (
    <div className="relative h-screen bg-gray-800">
      {/* Main Content Area */}
      <div className="flex h-full">
        {/* Side Panel */}
        <div className="w-1/4 ml-0 bg-gray-800 text-white p-4 flex flex-col">
          {/* Profile Section */}
          <div className="mt-2 p-12 bg-gray-700 rounded-2xl">
            <h2 className="mb-4 text-xl font-bold">Admin Panel</h2>
            <p className="text-base">Manage Users and Content</p>
          </div>

          
          <div className="mb-0 mt-6 p-4 bg-gray-700 rounded-2xl">
            <ul>
              <li className="mt-2 p-2 mb-2 w-full bg-gray-500 hover:bg-zinc-600 cursor-pointer text-center transition-colors duration-400">Dashboard</li>
              <li className="p-2 mb-2 w-full bg-gray-500 cursor-pointer hover:bg-zinc-600 text-center transition-colors duration-400">History</li>
              <li className="p-2 mb-2 w-full bg-gray-500 hover:bg-zinc-600 cursor-pointer text-center transition-colors duration-400">Settings</li>
            </ul>
          </div>

          
          <div className="h-32 p-4 bg-gray-700 rounded-lg mt-auto">
            <button className="w-full p-3 bg-gray-500 hover:bg-zinc-600 cursor-pointer text-center transition-colors duration-300 mb-2">
              My Docs
            </button>
            <button
              className="w-full p-2 bg-red-500 hover:bg-red-600 cursor-pointer text-center transition-colors duration-300"
              onClick={handleAdminLogout} 
            >
              Admin Logout
            </button>
          </div>
        </div>

        
        <div className="flex-1 flex flex-col text-slate-800 bg-gray-800 p-4">
          
          <div className="flex-1 p-4 bg-gray-300 rounded-lg overflow-y-auto mb-4">
            <h3 className="text-lg font-bold mb-2">Query Graph</h3>
            <div className="bg-white p-4 rounded-lg">
              
              <p>Graph will be displayed here.</p>
            </div>
          </div>

          
          <div className="flex justify-between space-x-4">
            <div
              className="cursor-pointer p-4 bg-gray-700 text-white rounded-lg flex-1 h-32 flex items-center justify-center"
              onClick={() => setActiveTab('badWords')}
            >
              Bad Words Management
            </div>

            <div
              className="cursor-pointer p-4 bg-gray-700 text-white rounded-lg flex-1 h-32 flex items-center justify-center"
              onClick={() => setActiveTab('roleManagement')}
            >
              Role Management
            </div>

            <div
              className="cursor-pointer p-4 bg-gray-700 text-white rounded-lg flex-1 h-32 flex items-center justify-center"
              onClick={() => setActiveTab('documentUpdate')}
            >
              Document Update
            </div>
          </div>
        </div>
      </div>

      
      {activeTab && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-3/4 h-3/4 bg-white p-4 rounded-lg overflow-y-auto relative">
            
            <button
              className="absolute top-4 right-4 text-black text-xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>

            
            {activeTab === 'roleManagement' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Role Management</h2>

                
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Search employees"
                    className="flex-grow p-2 border border-gray-400 rounded-l-lg text-black"
                    value={employeeSearch}
                    onChange={(e) => setEmployeeSearch(e.target.value)}
                  />
                  <button className="p-2 bg-green-600 text-white rounded-r-lg">
                    <FaSearch />
                  </button>
                </div>

                
                <div className="bg-gray-200 p-4 rounded-lg mt-4">
                  {filteredEmployees.map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between mb-4 p-2 bg-slate-300 rounded">
                      <span className="text-gray-800">{employee.name}</span>
                      <select
                        className="p-2 bg-slate-400 text-white rounded"
                        value={employee.role}
                        onChange={(e) => handleRoleChange(employee.id, e.target.value)}
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            
            {activeTab === 'badWords' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Bad Words Management</h2>

                
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Search bad words"
                    className="flex-grow p-2 border border-gray-400 rounded-l-lg text-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="p-2 bg-blue-600 text-white rounded-r-lg" onClick={handleSearch}>
                    <FaSearch />
                  </button>
                </div>

                
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Add new bad word"
                    className="flex-grow p-2 border border-gray-400 rounded-l-lg text-black"
                    value={badWord}
                    onChange={(e) => setBadWord(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    className="p-2 bg-blue-600 text-white rounded-r-lg"
                    onClick={addBadWord}
                  >
                    <FaPlus />
                  </button>
                </div>

                
                {message && (
                  <div className="bg-green-200 p-4 rounded-lg mb-4">
                    <p className="text-green-800">{message}</p>
                  </div>
                )}

                
                {searchResult && (
                  <div className="bg-gray-200 p-4 rounded-lg mt-8">
                    <p className="text-gray-800">{searchResult}</p>
                  </div>
                )}
              </div>
            )}

            
            {activeTab === 'documentUpdate' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Document Update</h2>
                <p>Update documents here.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
