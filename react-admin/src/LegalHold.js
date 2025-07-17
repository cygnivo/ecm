
import React, { useState } from 'react';
import axios from 'axios';

const LegalHold = ({ token }) => {
  const [form, setForm] = useState({ orgId: '', contRepId: '', docName: '', hold: true });

  const toggleHold = async () => {
    await axios.post('/legalhold/set', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Legal hold updated');
  };

  return (
    <div>
      <h2>Legal Hold Management</h2>
      <input placeholder="ORGID" onChange={e => setForm({ ...form, orgId: e.target.value })} />
      <input placeholder="CONTREP_ID" onChange={e => setForm({ ...form, contRepId: e.target.value })} />
      <input placeholder="DOC_NAME" onChange={e => setForm({ ...form, docName: e.target.value })} />
      <label>
        <input type="checkbox" checked={form.hold} onChange={e => setForm({ ...form, hold: e.target.checked })} />
        Apply Legal Hold
      </label>
      <button onClick={toggleHold}>Update Hold</button>
    </div>
  );
};

export default LegalHold;
