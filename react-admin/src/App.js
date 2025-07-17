
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import MetadataSchema from './MetadataSchema';
import Dashboard from './Dashboard';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard token={token} />} />
        <Route path="/metadata" element={<MetadataSchema token={token} />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;
