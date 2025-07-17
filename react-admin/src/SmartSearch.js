
import React, { useState } from 'react';
import axios from 'axios';

const SmartSearch = ({ token }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [orgId, setOrgId] = useState('');
  const [contRepId, setContRepId] = useState('');

  const search = async () => {
    const res = await axios.get('/search', {
      headers: { Authorization: `Bearer ${token}` },
      params: { query, orgId, contRepId }
    });
    setResults(res.data);
  };

  return (
    <div>
      <h2>Smart Search</h2>
      <input placeholder="ORGID" value={orgId} onChange={e => setOrgId(e.target.value)} />
      <input placeholder="CONTREP_ID" value={contRepId} onChange={e => setContRepId(e.target.value)} />
      <input placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={search}>Search</button>
      <ul>
        {results.map((r, i) => (
          <li key={i}>{r.NAME}: {r.SHORT_PROPERTY} / {r.SHORT_VALUE}</li>
        ))}
      </ul>
    </div>
  );
};

export default SmartSearch;
