import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import FindLabour from './components/FindLabour';
import FindWork from './components/FindWork';
import './index.css'; // For Tailwind CSS

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="p-4 text-white bg-indigo-600">
          <ul className="flex space-x-4">
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/find-labour">Find Labour</Link></li>
            <li><Link to="/find-work">Find Work</Link></li>
          </ul>
        </nav>
        <div className="container mx-auto">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/find-labour" element={<FindLabour />} />
            <Route path="/find-work" element={<FindWork />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const Home = () => (
  <div className="flex items-center justify-center h-screen">
    <h1 className="text-4xl font-bold">The Labour</h1>
  </div>
);

export default App;
