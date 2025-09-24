// src/components/FindLabour.js
import React, { useState } from 'react';

const FindLabour = () => {
  const [searchParams, setSearchParams] = useState({ workType: '', location: '', count: 1 });
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    // API call to search for labor
    // setResults(fetchedData);
  };

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Find Labour</h2>
      <form onSubmit={handleSearch} className="p-4 mb-6 space-y-4 bg-white rounded shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Work Type</label>
          <select name="workType" value={searchParams.workType} onChange={(e) => setSearchParams({...searchParams, workType: e.target.value})} className="w-full p-2 mt-1 border rounded">
            <option value="">All</option>
            <option value="Rajmistri">Rajmistri</option>
            <option value="Farming">Farming</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Tile-Patthar">Tile-Patthar</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input type="text" name="location" value={searchParams.location} onChange={(e) => setSearchParams({...searchParams, location: e.target.value})} className="w-full p-2 mt-1 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Labourers</label>
          <input type="number" name="count" value={searchParams.count} onChange={(e) => setSearchParams({...searchParams, count: e.target.value})} className="w-full p-2 mt-1 border rounded" min="1" />
        </div>
        <button type="submit" className="p-2 text-white bg-indigo-600 rounded hover:bg-indigo-700">Search</button>
      </form>
      {/* Display search results here */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map(laborer => (
          <div key={laborer._id} className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold">{laborer.name}</h3>
            <p className="text-sm text-gray-600">Work Type: {laborer.workType}</p>
            <p className="text-sm text-gray-600">Location: {laborer.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindLabour; 


// src/components/FindLabour.js
import React, { useState } from 'react';
import StarRating from './StarRating'; // Import the StarRating component

// ... (existing code)

  return (
    // ... (existing JSX)
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map(laborer => (
          <div key={laborer._id} className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold">{laborer.name}</h3>
            <p className="text-sm text-gray-600">Work Type: {laborer.workType}</p>
            <p className="text-sm text-gray-600">Location: {laborer.location}</p>
            <div className="flex items-center">
              <StarRating rating={laborer.averageRating} readOnly={true} />
              <span className="ml-2 text-sm text-gray-600">({laborer.ratingsCount} reviews)</span>
            </div>
          </div>
        ))}
      </div>
    // ... (existing JSX)
  );
};

