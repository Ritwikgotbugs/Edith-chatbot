import React, { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  role: string;
}

const RoleManagement: React.FC = () => {
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'Samyak Tripathi', role: 'Intern' },
    { id: 2, name: 'Ritwik Sharma', role: 'Developer' },
    { id: 3, name: 'Himanshu Bhadani', role: 'Managing' },
    { id: 4, name: 'Manavi Lahoti', role: 'Intern' },
    { id: 5, name: 'Anish Agrawal', role: 'Intern' },
    { id: 6, name: 'Arnav Agrawal', role: 'Developer' },
  ]);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  const handleRoleChange = (id: number, newRole: string) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id ? { ...emp, role: newRole } : emp
      )
    );
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-white">Role Management</h3>
      <div className="mb-4">
        <input
          type="text"
          value={employeeSearch}
          onChange={(e) => setEmployeeSearch(e.target.value)}
          className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none"
          placeholder="Search employees"
        />
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredEmployees.map((employee) => (
          <li key={employee.id} className="flex justify-between items-center py-3">
            <div>
              <p className="text-white font-medium">{employee.name}</p>
              <p className="text-gray-400">ID: {employee.id}</p>
            </div>
            <select
              value={employee.role}
              onChange={(e) => handleRoleChange(employee.id, e.target.value)}
              className="p-2 border text-black border-gray-300 rounded-md focus:outline-none"
            >
              <option value="Intern">Intern</option>
              <option value="Developer">Developer</option>
              <option value="Managing">Managing</option>
              <option value="Admin">Admin</option>
            </select>
          </li>
        ))}
        {filteredEmployees.length === 0 && (
          <li className="text-gray-400 text-center py-3">No employees found.</li>
        )}
      </ul>
    </div>
  );
};

export default RoleManagement;
