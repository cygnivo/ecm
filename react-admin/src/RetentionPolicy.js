
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RetentionPolicy = ({ token }) => {
  const [rules, setRules] = useState([]);
  const [form, setForm] = useState({ orgId: '', contRepId: '', docType: '', years: 7, deleteAfter: false });

  const loadRules = async () => {
    const res = await axios.get('/retention/list', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRules(res.data);
  };

  const createRule = async () => {
    await axios.post('/retention/create', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    loadRules();
  };

  return (
    <div>
      <h2>Retention Policies</h2>
      <input placeholder="ORGID" onChange={e => setForm({ ...form, orgId: e.target.value })} />
      <input placeholder="CONTREP_ID" onChange={e => setForm({ ...form, contRepId: e.target.value })} />
      <input placeholder="DOC_TYPE" onChange={e => setForm({ ...form, docType: e.target.value })} />
      <input type="number" placeholder="Years" onChange={e => setForm({ ...form, years: parseInt(e.target.value) })} />
      <label>
        <input type="checkbox" onChange={e => setForm({ ...form, deleteAfter: e.target.checked })} />
        Auto-delete after retention
      </label>
      <button onClick={createRule}>Create Rule</button>
      <ul>
        {rules.map((r, i) => (
          <li key={i}>{r.ORGID}/{r.CONTREP_ID} - {r.DOC_TYPE || 'ALL'}: {r.RETENTION_YEARS} years {r.DELETE_AFTER_RETENTION ? '(auto-delete)' : ''}</li>
        ))}
      </ul>
    </div>
  );
};

export default RetentionPolicy;
