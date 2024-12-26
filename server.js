const express = require("express");
const app = express();
const employees = require("./employees");

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.get("/employees", (req, res) => {
  res.json(employees);
});

app.get("/employees/random", (req, res) => {
  if (employees.length === 0) {
    return res.status(404).json({ message: "No employees found." });
  }

  const randomEmployee =
    employees[Math.floor(Math.random() * employees.length)];
  res.json(randomEmployee);
});

app.get("/employees/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((emp) => emp.id === parseInt(id));

  if (!employee) {
    return res
      .status(404)
      .json({ message: `Employee with id ${id} not found` });
  }

  res.json(employee);
});

const PORT = 3000;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
