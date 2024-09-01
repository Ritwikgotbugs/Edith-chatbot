"use client"; // Correct directive

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaHistory, FaUserLock, FaFolderOpen, FaPaperPlane, FaBars, FaTimes, FaSearch, FaPlus, FaSignOutAlt } from 'react-icons/fa'; // Import icons

function AdminPage() {
  const [activeTab, setActiveTab] = useState(null);
  const [badWord, setBadWord] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [badWordsList, setBadWordsList] = useState([]);
  const [searchResult, setSearchResult] = useState('');
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Samyak Tripathi', role: 'Intern' },
    { id: 2, name: 'Ritwik Sharma', role: 'Developer' },
    { id: 3, name: 'Himanshu Bhadani', role: 'Managing' },
    { id: 4, name: 'Manavi Lahoti', role: 'Intern' },
    { id: 5, name: 'Anish Agrawal', role: 'Intern' },
    { id: 6, name: 'Arnav Agrawal', role: 'Developer' },
  ]);
  
  const [isDocumentsExpanded, setIsDocumentsExpanded] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true); // State for collapsible side nav
  
  const router = useRouter(); // Using Next.js router for navigation

  const closeModal = () => setActiveTab(null);

  const handleAdminLogout = () => {
    router.push('/home');
  };

  const handleRoleChange = (id, newRole) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id ? { ...emp, role: newRole } : emp
      )
    );
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  return (
    <div className="relative h-screen bg-gray-700">
      {/* Hamburger/Cross Menu Button */}
      <button
        className="absolute top-2 left-4 mt-2 z-50 p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
        onClick={() => setIsNavCollapsed(!isNavCollapsed)}
      >
        {isNavCollapsed ? <FaBars size={24} /> : <FaTimes size={24} />} {/* Toggle between icons */}
      </button>

      <div className="flex h-full">
        {/* Collapsible Side Panel */}
        <div
          className={`fixed top-2 left-2 z-40 h-full bg-gray-700 text-black p-4 flex flex-col transition-transform duration-300 ease-in-out ${
            isNavCollapsed ? '-translate-x-full' : 'translate-x-0'
          } w-64`}
        >
          {/* Profile Section */}
          <div className="mt-12 p-7 bg-gray-300 rounded-2xl">
            <h2 className="mb-3 text-xl font-bold">Samyak Tripathi</h2>
            <p className="mb-2 text-base">ID: 12345</p>
            <p className="text-base py-1">
              Role :{' '}
              <span className="bg-black ml-1 text-base text-white rounded-3xl py-1 px-3.5">
                Developer
              </span>
            </p>
          </div>

          {/* Tabs Section */}
          <div className="mt-9 p-6 bg-gray-300 rounded-2xl">
            <ul>
              <li className="flex items-center justify-left mt-2 p-2 mb-2 w-full hover:bg-gray-500 cursor-pointer text-left text-lg transition-colors rounded-2xl duration-400">
                <FaHome className="mr-6" /> Home
              </li>
              <li className="flex items-center justify-left p-2 mb-2 w-full cursor-pointer hover:bg-gray-500 text-left text-lg transition-colors rounded-2xl duration-400">
                <FaHistory className="mr-6" /> History
              </li>
            </ul>
          </div>

          {/* My Documents Section */}
          <div className="mt-auto mb-2 p-6 bg-gray-300 rounded-2xl">
            <div
              className="cursor-pointer text-base text-center flex mr-2 mt-0 items-center justify-center"
              onClick={() => setIsDocumentsExpanded(!isDocumentsExpanded)}
            >
              <FaFolderOpen className="mr-3" /> My Documents
            </div>
            <div
              className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                isDocumentsExpanded ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <div className="mt-4">
                <p className="text-base text-center">Document 1</p>
                <p className="text-base text-center">Document 2</p>
                <p className="text-base text-center">Document 3</p>
              </div>
            </div>
          </div>

          <div className="mt-2 mb-4 p-6">
            <button
              onClick={handleAdminLogout}
              className="flex items-center justify-center w-full py-2 text-lg font-bold text-black bg-red-500 rounded-2xl hover:bg-red-600 transition-colors duration-300"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className={`mt-2 flex-1 flex flex-col text-slate-800 bg-gray-700 p-4 transition-all duration-300 ease-in-out ${isNavCollapsed ? 'ml-0' : 'ml-64'}`}>
          <div className="flex-1 p-3 bg-gray-300 mr-1 rounded-2xl ml-16 overflow-y-auto mb-2">
            <h3 className="text-lg font-bold mb-4">Query Graph</h3>
            <div className="bg-white p-4 rounded-lg">
              <p>Graph will be displayed here.</p>
            </div>
          </div>

          <div className="flex justify-between space-x-4">
            <div
              className="cursor-pointer p-2 bg-gray-800 ml-16 hover:bg-gray-900 text-white rounded-lg flex-1 h-32 flex items-center justify-center"
              onClick={() => setActiveTab('badWords')}
            >
              Bad Words Management
            </div>

            <div
              className="cursor-pointer p-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg flex-1 h-32 flex items-center justify-center"
              onClick={() => setActiveTab('roleManagement')}
            >
              Role Management
            </div>

            <div
              className="cursor-pointer p-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg flex-1 h-32 flex items-center justify-center"
              onClick={() => setActiveTab('documentUpdate')}
            >
              Document Update
            </div>
          </div>
        </div>
      </div>

      {/* Modal Content */}
      {activeTab && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-3/4 h-3/4 bg-white p-4 rounded-lg overflow-y-auto relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-black text-xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* Role Management Tab */}
            {activeTab === 'roleManagement' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Role Management</h2>

                {/* Search Employees */}
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

                {/* Employee List */}
                <div className="bg-gray-200 p-4 rounded-lg mt-4">
                  {filteredEmployees.map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center justify-between mb-4 p-2 bg-slate-300 rounded"
                    >
                      <span className="text-gray-800">{employee.name}</span>
                      <select
                        className="p-2 bg-slate-400 text-white rounded"
                        value={employee.role}
                        onChange={(e) =>
                          handleRoleChange(employee.id, e.target.value)
                        }
                      >
                        <option value="Intern">Intern</option>
                        <option value="Developer">Developer</option>
                        <option value="Manager">Manager</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bad Words Management Tab */}
            {activeTab === 'badWords' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Bad Words Management</h2>

                {/* Search Bad Words */}
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Search bad words"
                    className="flex-grow p-2 border border-gray-400 rounded-l-lg text-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="p-2 bg-green-600 text-white rounded-r-lg"
                    onClick={() => setSearchResult('Search Result for: ' + searchQuery)}
                  >
                    <FaSearch />
                  </button>
                </div>

                {searchResult && (
                  <p className="text-lg font-semibold mb-4">{searchResult}</p>
                )}

                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Add a bad word"
                    className="flex-grow p-2 border border-gray-400 rounded-l-lg text-black"
                    value={badWord}
                    onChange={(e) => setBadWord(e.target.value)}
                  />
                  <button
                    className="p-2 bg-red-600 text-white rounded-r-lg"
                    onClick={() => {
                      setBadWordsList([...badWordsList, badWord]);
                      setBadWord('');
                    }}
                  >
                    <FaPlus />
                  </button>
                </div>

                <ul className="list-disc list-inside bg-gray-200 p-4 rounded-lg">
                  {badWordsList.map((word, index) => (
                    <li key={index} className="text-red-600">
                      {word}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Document Update Tab */}
            {activeTab === 'documentUpdate' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Document Update</h2>
                <p>Document Update Feature Here</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
