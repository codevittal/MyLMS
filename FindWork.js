// src/components/FindWork.js
import React, { useState, useEffect } from 'react';

const FindWork = () => {
  const [workPostings, setWorkPostings] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Fetch work postings from API
    // setWorkPostings(fetchedData);
  }, []);

  const filteredWork = workPostings.filter(work => work.workType.includes(filter));

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Find Work</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Filter by Work Type</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full p-2 mt-1 border rounded">
          <option value="">All</option>
          <option value="Rajmistri">Rajmistri</option>
          <option value="Farming">Farming</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Tile-Patthar">Tile-Patthar</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredWork.map(work => (
          <div key={work._id} className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold">{work.title}</h3>
            <p className="text-sm text-gray-600">{work.description}</p>
            <p className="text-sm text-gray-600">Type: {work.workType}</p>
            <p className="text-sm text-gray-600">Location: {work.location}</p>
            <p className="text-sm text-gray-600">Labour Required: {work.laborRequired}</p>
            <button className="px-4 py-2 mt-2 text-white bg-green-600 rounded hover:bg-green-700">Book</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindWork;
