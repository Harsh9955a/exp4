import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");

  const API = "http://localhost:5000/employees";

  // Fetch employees
  const getEmployees = async () => {
    const res = await axios.get(API);
    setEmployees(res.data);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // Add employee
  const addEmployee = async () => {
    if (!name) return alert("Enter name");

    await axios.post(API, {
      id: Date.now().toString(),
      name: name
    });

    setName("");
    getEmployees();
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    await axios.delete(`${API}/${id}`);
    getEmployees();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Employee Management System</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={addEmployee}>Add</button>

      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name}
            <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;