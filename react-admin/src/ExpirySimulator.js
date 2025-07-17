
import React, { useState } from 'react';
import axios from 'axios';

const ExpirySimulator = ({ token }) => {
  const [form, setForm] = useState({ orgId: '', contRepId: '' });
  const [result, setResult] = useState([]);

  const simulate = async () => {
    const res = await axios.post('/cleanup/simulate-expiry-cleanup', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setResult(res.data.deleted);
  };

  return (
    <div>
      <h2>Simulate Expired Document Cleanup</h2>
      <input placeholder="ORGID" onChange={e => setForm({ ...form, orgId: e.target.value })} />
      <input placeholder="CONTREP_ID" onChange={e => setForm({ ...form, contRepId: e.target.value })} />
      <button onClick={simulate}>Run Cleanup</button>
      {result.length > 0 && (
        <ul>
          {result.map((name, i) => (
            <li key={i}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpirySimulator;
