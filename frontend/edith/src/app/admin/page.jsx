"use client"; // Correct directive

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaHistory, FaFolderOpen, FaTimes, FaSignOutAlt, FaBars } from 'react-icons/fa'; // Import icons
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2'; // Import react-chartjs-2 for easy integration

// Register Chart.js components
Chart.register(...registerables);

function AdminPage() {
  const [activeTab, setActiveTab] = useState(null);
  const [badWord, setBadWord] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [badWordsList, setBadWordsList] = useState([]);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Samyak Tripathi', role: 'Intern' },
    { id: 2, name: 'Ritwik Sharma', role: 'Developer' },
    { id: 3, name: 'Himanshu Bhadani', role: 'Managing' },
    { id: 4, name: 'Manavi Lahoti', role: 'Intern' },
    { id: 5, name: 'Anish Agrawal', role: 'Intern' },
    { id: 6, name: 'Arnav Agrawal', role: 'Developer' },
  ]);
  
  const [documentName, setDocumentName] = useState('');
  const [documentList, setDocumentList] = useState([]);
  const [isDocumentsExpanded, setIsDocumentsExpanded] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true); // State for collapsible side nav
  const [editingDocument, setEditingDocument] = useState(null); // State for editing a document
  
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

  // Bar chart data and options
  const chartData = {
    labels: ['Keyword 1', 'Keyword 2', 'Keyword 3', 'Keyword 4', 'Keyword 5', 'Others'],
    datasets: [
      {
        label: 'Frequency',
        data: [15, 20, 10, 30, 25, 18], // Example data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label + ': ' + context.raw;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleAddDocument = () => {
    if (editingDocument !== null) {
      // Update existing document
      const updatedDocuments = documentList.map((doc, index) =>
        index === editingDocument ? documentName : doc
      );
      setDocumentList(updatedDocuments);
      setEditingDocument(null);
    } else {
      // Add new document
      setDocumentList([...documentList, documentName]);
    }
    setDocumentName('');
  };

  const handleEditDocument = (index) => {
    setDocumentName(documentList[index]);
    setEditingDocument(index);
  };

  const handleDeleteDocument = (index) => {
    setDocumentList(documentList.filter((_, i) => i !== index));
  };

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
          className={`fixed top-1 left-4 z-40 h-full bg-gray-700 text-black p-4 flex flex-col transition-transform duration-300 ease-in-out ${
            isNavCollapsed ? '-translate-x-full' : 'translate-x-0'
          } w-64`}
        >
          {/* Profile Section */}
          <div className="mt-16 p-8 bg-gray-300 rounded-2xl">
            <h2 className="mb-4 text-xl font-bold">Samyak Tripathi</h2>
            <p className="mb-3 text-base">ID: 12345</p>
            <p className="text-base py-1">
              Role :{' '}
              <span className="bg-black ml-1 text-base text-white rounded-3xl py-1 px-3.5">
                Developer
              </span>
            </p>
          </div>

          {/* Tabs Section */}
          <div className="mt-16 p-6 bg-gray-300 rounded-2xl">
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
          <div className="mt-auto mb-8 p-6 bg-gray-300 rounded-2xl">
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
                {documentList.map((doc, index) => (
                  <div key={index} className="text-base text-center mt-2">
                    <p>{doc}</p>
                    <button
                      onClick={() => handleEditDocument(index)}
                      className="text-blue-500 underline mx-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDocument(index)}
                      className="text-red-500 underline"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`mt-12 mr-4 flex-1 flex flex-col text-slate-800 bg-gray-700 p-4 transition-all duration-300 ease-in-out ${isNavCollapsed ? 'ml-0' : 'ml-64'}`}>
          {/* Logout Button */}
          <button
          onClick={handleAdminLogout}
          className="absolute mr-4 top-4 right-4 px-4 py-1 bg-red-500 text-black rounded-lg flex items-center space-x-2 hover:bg-red-600 focus:outline-none"
          >
            <FaSignOutAlt size={20} />
            <span className="text-lg font-semibold">Logout</span>
          </button>

          <div className="flex-1 p-3 bg-gray-300 rounded-2xl ml-16 overflow-hidden mb-4">
            <h3 className="text-lg font-bold mb-4">Query Graph</h3>
            <div className="bg-white p-16 rounded-lg ">
              <div className="h-80 ml-28">
                <Bar data={chartData} options={chartOptions} />
              </div>
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

            {/* BAD WORDS Tab */}
            {activeTab === 'badWords' && (
              <div>
                <h3 className="text-lg text-black font-bold mb-4">Bad Words Management</h3>
                <div>
                  <input
                    type="text"
                    value={badWord}
                    onChange={(e) => setBadWord(e.target.value)}
                    className="p-2 border text-black border-gray-400 rounded-md w-full"
                    placeholder="Enter bad word"
                  />
                  <button
                    onClick={() => {
                      setBadWordsList([...badWordsList, badWord]);
                      setBadWord('');
                    }}
                    className="mt-2 bg-blue-500 text-black px-4 py-2 rounded-md"
                  >
                    Add
                  </button>
                </div>
                <ul className="mt-4">
                  {badWordsList.map((word, index) => (
                    <li key={index} className="flex justify-between text-black p-2 border-b border-gray-300">
                      {word}
                      <button
                        onClick={() => {
                          setBadWordsList(badWordsList.filter((w) => w !== word));
                        }}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Role Management Tab */}
            {activeTab === 'roleManagement' && (
              <div>
                <h3 className="text-lg text-black font-bold mb-4">Role Management</h3>
                <div>
                  <input
                    type="text"
                    value={employeeSearch}
                    onChange={(e) => setEmployeeSearch(e.target.value)}
                    className="p-2 border text-black border-gray-400 rounded-md w-full"
                    placeholder="Search employees"
                  />
                  <ul className="mt-4">
                    {filteredEmployees.map((employee) => (
                      <li key={employee.id} className="flex justify-between text-black p-2 border-b border-gray-300">
                        {employee.name} - {employee.role}
                        <select
                          value={employee.role}
                          onChange={(e) => handleRoleChange(employee.id, e.target.value)}
                          className="ml-4 p-1 border border text-black-gray-400 rounded-md"
                        >
                          <option value="Intern">Intern</option>
                          <option value="Developer">Developer</option>
                          <option value="Managing">Managing</option>
                        </select>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Document Update Tab */}
            {activeTab === 'documentUpdate' && (
              <div>
                <h3 className="text-lg text-black font-bold mb-4">Document Update</h3>
                <div>
                  <input
                    type="text"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    placeholder="Enter new document name"
                    className="p-2 border border-gray-400 text-black rounded-md w-full"
                  />
                  <button
                    onClick={handleAddDocument}
                    className="mt-2 bg-blue-500 text-black text-white px-4 py-2 rounded-md"
                  >
                    {editingDocument !== null ? 'Update Document' : 'Add Document'}
                  </button>
                </div>
                <ul className="mt-4">
                  {documentList.map((doc, index) => (
                    <li key={index} className="flex justify-between text-black p-2 border-b border-gray-300">
                      {doc}
                      <button
                        onClick={() => handleEditDocument(index)}
                        className="text-blue-500 underline mx-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDocument(index)}
                        className="text-red-500 underline"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
