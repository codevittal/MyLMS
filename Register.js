// src/components/Register.js
import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    identifier: '', // This will be either email or mobile
    password: '',
    role: 'laborer',
    workType: '',
    location: '',
  });

  const handleIdentifierChange = (e) => {
    const { value } = e.target;
    // Simple check to determine if input is a mobile number or email
    const isMobile = !value.includes('@');
    setFormData({
      ...formData,
      identifier: value,
      email: isMobile ? null : value,
      mobile: isMobile ? value : null,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data); // Handle success (e.g., redirect to login)
    } catch (error) {
      console.error('Registration failed', error); // Handle error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Register as {formData.role}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 mt-1 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email or Mobile</label>
            <input type="text" name="identifier" value={formData.identifier} onChange={handleIdentifierChange} className="w-full p-2 mt-1 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 mt-1 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 mt-1 border rounded">
              <option value="laborer">Laborer</option>
              <option value="work_poster">Work Poster</option>
            </select>
          </div>
          {formData.role === 'laborer' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Work Type</label>
              <select name="workType" value={formData.workType} onChange={handleChange} className="w-full p-2 mt-1 border rounded" required>
                <option value="">Select Work Type</option>
                <option value="Rajmistri">Rajmistri</option>
                <option value="Farming">Farming</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Tile-Patthar">Tile-Patthar</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 mt-1 border rounded" required />
          </div>
          <button type="submit" className="w-full p-2 text-white bg-indigo-600 rounded hover:bg-indigo-700">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
