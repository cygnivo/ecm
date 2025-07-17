
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ token }) => {
  return (
    <div>
      <h1>Welcome to SAP Content Server Admin</h1>
      <nav>
        <ul>
          <li><Link to="/metadata">Manage Metadata Schema</Link></li>
          {/* More links can be added here */}
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
