import { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load users");
        return res.json();
      })
      .then(setUsers)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="heading">
        <div>
          <p className="tag">OVERVIEW</p>
          <h1>Employee Dashboard</h1>
          <p>Manage and view employee information.</p>
        </div>
        <Link className="button" to="/employee">
          + Add Employee
        </Link>
      </div>

      <div className="stats">
        <div className="card">
          <p>Total Users</p>
          <h2>{users.length}</h2>
        </div>
        <div className="card">
          <p>Data Source</p>
          <h2>External API</h2>
        </div>
      </div>

      <div className="card table-card">
        <h2>Employee List</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function EmployeeForm() {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    location: "",
    salary: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Employee details:", form);
    setMessage("Employee form submitted successfully!");
  }

  return (
    <div className="form-page">
      <p className="tag">EMPLOYEE MANAGEMENT</p>
      <h1>Add Employee</h1>
      <p>Enter the employee details below.</p>

      <form className="card employee-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="name"
          placeholder="Enter full name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Designation</label>
        <input
          name="designation"
          placeholder="e.g. Software Developer"
          value={form.designation}
          onChange={handleChange}
          required
        />

        <label>Location</label>
        <input
          name="location"
          placeholder="Enter location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <label>Salary</label>
        <input
          name="salary"
          type="number"
          min="0"
          placeholder="Enter salary"
          value={form.salary}
          onChange={handleChange}
          required
        />

        <button className="button" type="submit">
          Submit Employee
        </button>

        {message && <p className="success">{message}</p>}
      </form>
    </div>
  );
}

export default function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="brand">EmployeeHub</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/employee">Employee Form</Link>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<EmployeeForm />} />
        </Routes>
      </main>

      <footer>EmployeeHub · Employee Management Dashboard</footer>
    </>
  );
}
