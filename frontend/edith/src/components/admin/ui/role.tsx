import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/client';

interface Employee {
  id: string;
  name: string;
  role: string;
}

const RoleManagement: React.FC = () => {
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const employeesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          role: doc.data().role,
        }));
        setEmployees(employeesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employees: ', error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  const handleRoleChange = async (id: string, newRole: string) => {
    try {
      const employeeDocRef = doc(db, 'users', id);
      await updateDoc(employeeDocRef, { role: newRole });
      setEmployees(
        employees.map((emp) =>
          emp.id === id ? { ...emp, role: newRole } : emp
        )
      );
    } catch (error) {
      console.error('Error updating role: ', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Role Management</h3>
      <div className="mb-4">
        <input
          type="text"
          value={employeeSearch}
          onChange={(e) => setEmployeeSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
          placeholder="Search employees"
        />
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredEmployees.map((employee) => (
          <li key={employee.id} className="flex justify-between items-center py-3">
            <div>
              <p className="text-gray-800 font-medium">{employee.name}</p>
              <p className="text-gray-500">Role: {employee.role}</p>
            </div>
            <select
              value={employee.role}
              onChange={(e) => handleRoleChange(employee.id, e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none"
            >
              <option value="Intern">Intern</option>
              <option value="Developer">Developer</option>
              <option value="Managing">Managing</option>
            </select>
          </li>
        ))}
        {filteredEmployees.length === 0 && (
          <li className="text-gray-500 text-center py-3">No employees found.</li>
        )}
      </ul>
    </div>
  );
};

export default RoleManagement;
