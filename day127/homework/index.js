import React, { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });

  
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

 
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    const duplicate = users.find(user => user.email === formData.email);
    if (duplicate) {
      alert('A user with this email already exists.');
      return;
    }


    setUsers([...users, formData]);
    setFormData({ firstName: '', lastName: '', email: '' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <input
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>

      {                 }
      <div className="mt-6">
        <h3 className="text-xl font-bold">Registered Users</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index} className="p-2 border-b">
              {user.firstName} {user.lastName} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
