const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let employees = [];

// Get all employees
app.get('/employees', (req, res) => {
    res.json(employees);
});

// Add employee
app.post('/employees', (req, res) => {
    const emp = req.body;
    employees.push(emp);
    res.json({ message: "Employee added" });
});

// Delete employee
app.delete('/employees/:id', (req, res) => {
    const id = req.params.id;
    employees = employees.filter(e => e.id !== id);
    res.json({ message: "Deleted" });
});

app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});